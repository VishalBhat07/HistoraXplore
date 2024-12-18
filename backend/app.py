from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from geopy.geocoders import Nominatim
import wikipediaapi
from transformers import pipeline
import re,bs4,requests,wikipedia
app = Flask(__name__, 
            static_folder='static',
            static_url_path='')
CORS(app)


class HistoricalContentFetcher:
    def __init__(self):
        self.apis = {
            "open_library": {
                "base_url": "https://openlibrary.org/search.json",
                "works_url": "https://openlibrary.org/works/",
                "book_url": "https://openlibrary.org/books/"
            },
            "project_gutenberg": {
                "base_url": "https://www.gutenberg.org/ebooks/search/",
                "catalog_url": "https://www.gutenberg.org/browse/scores/top"
            },
            "unesco": {
                "search_url": "https://www.unesco.org/en/search"
            }
        }
        self.cache = {}
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    def get_area_name(self, lat, lng):
        try:
            geolocator = Nominatim(user_agent="my_app")
            location = geolocator.reverse(f"{lat}, {lng}")
            address = location.raw['address']
            area_parts = []
            if 'city' in address:
                area_parts.append(address['city'])
            if 'state' in address:
                area_parts.append(address['state'])
            if 'country' in address:
                area_parts.append(address['country'])
            return area_parts[0]
        except Exception as e:
            print(f"Error: {e}")
            raise e

    def scrape_unesco_content(self, area_name, year):
        try:
            search_url = f"{self.apis['unesco']['search_url']}?category=UNESCO&text={area_name}+{year}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(search_url, headers=headers)
        
            if response.status_code == 200:
                soup = bs4.BeautifulSoup(response.text, 'html.parser')
                content_blocks = soup.find_all(['p', 'div'], string=lambda text: area_name in text and str(year) in text)
                historical_content = [block.get_text(strip=True) for block in content_blocks]
                print(historical_content)
                print(type(historical_content))
                return ' '.join(historical_content)
            return ""
        except Exception as e:
            print(f"UNESCO web scraping error: {e}")
            return ""

    def fetch_wikipedia_content(self, area_name, year):
        try:
            user_agent = "HistoriaXplore/1.0 (https://github.com/VishalBhat07/histora-xplore; sushanthjoshi.cs23@rvce.edu.in)"
            wiki = wikipediaapi.Wikipedia(user_agent, 'en')
            search_items = wikipedia.search(f"{area_name} history", results=1)
            wiki_page = wiki.page(search_items[0])

            if not wiki_page.exists():
                return ""

            all_content = []
            content = wiki_page.text
            paragraphs = content.split('\n\n')
            year_pattern = rf'\b{year}\b'
            era_start = max(1200, year - 50)
            era_end = min(2024, year + 50)

            for para in paragraphs:
                if (re.search(year_pattern, para) or
                    any(str(y) in para for y in range(era_start, era_end + 1))):
                    all_content.append(para)
            #print(all_content)
            return ' '.join(all_content)
        except Exception as e:
            print(f"Wikipedia content fetch error: {e}")
            return ""

    def get_open_library_book_links(self, area_name, year):
        try:
            params = {
                "q": f"history of {area_name}",
                "limit": 5
            }
            response = requests.get(
                self.apis['open_library']['base_url'],
                params=params
            )

            if response.status_code == 200:
                data = response.json()
                book_links = []
                for book in data.get('docs', []):
                    if 'key' in book:
                        book_url = f"https://openlibrary.org{book['key']}"
                        book_links.append(book_url)
                return book_links
            return []
        except Exception as e:
            print(f"Open Library book search error: {e}")
            return []

    def get_project_gutenberg_book_links(self, area_name, year):
        try:
            base_url = "https://www.gutenberg.org/ebooks/search/?query="
            search_url = f"{base_url}{area_name}+history+{year}"
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36"
            }
            response = requests.get(search_url, headers=headers)

            if response.status_code != 200:
                print(f"Failed to fetch Project Gutenberg: {response.status_code}")
                return []

            soup = bs4.BeautifulSoup(response.content, "html.parser")
            book_links = ["https://www.gutenberg.org" + link['href'] for link in soup.find_all("a", href=re.compile(r'/ebooks/\d+'), limit=5)]
            return book_links
        except Exception as e:
            print(f"Project Gutenberg scraping error: {e}")
            return []

    def get_historical_summary(self, lat, lng, year):
        try:
            # cache_key = f"{lat}_{lng}_{year}"
            # if cache_key in self.cache:
            #     return self.cache[cache_key]

            area_name = self.get_area_name(lat, lng)
            wikipedia_content = self.fetch_wikipedia_content(area_name, year)
            unesco_content = self.scrape_unesco_content(area_name, year)
            open_library_book_links = self.get_open_library_book_links(area_name, year)
            gutenberg_book_links = self.get_project_gutenberg_book_links(area_name, year)

            historical_sources = [
                wikipedia_content,
                unesco_content
            ]
            historical_sources = [source for source in historical_sources if source]
            book_links = {
                "Open_Library": open_library_book_links,
                "Project_Gutenberg": gutenberg_book_links
            }
            if not historical_sources and not book_links:
                return "No historical information found."
            summaries = self.summarize_content(historical_sources)
            # self.cache[cache_key] = {
            #     "summaries": summaries,
            #     "book_links": book_links
            # }
            return {
                "summaries": summaries,
                "book_links": book_links
            }
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred while fetching historical information."

    def summarize_content(self, historical_sources):
        combined_text = ' '.join(historical_sources)
        max_chunk_length = 1024
        chunks = [combined_text[i:i + max_chunk_length] for i in range(0, len(combined_text), max_chunk_length)]
        summaries = []
        for chunk in chunks[:3]:
            summary = self.summarizer(chunk, max_length=150, min_length=50, do_sample=False)
            summaries.append(summary[0]['summary_text'])
        return ' '.join(summaries)

def get_historical_summary(lat, lng, year):
    fetcher = HistoricalContentFetcher()
    return jsonify(fetcher.get_historical_summary(lat, lng, year)),200
@app.route('/api/coordinates',methods=['POST'])
def get_summ():
    data=request.get_json()
    lng=data['lng']
    lat=data['lat']
    year=data['year']
    return get_historical_summary(lat,lng,year)

# def get_area_name(lat, lng):
#     try:
#         geolocator = Nominatim(user_agent="my_app")
#         location = geolocator.reverse(f"{lat}, {lng}")
#         address = location.raw['address']
#         area_parts = []
#         if 'city' in address:
#             area_parts.append(address['city'])
#         if 'state' in address:
#             area_parts.append(address['state'])
#         if 'country' in address:
#             area_parts.append(address['country'])
#         return ', '.join(area_parts[:2]) 
#     except Exception as e:
#             print(f"Error:{e}")
#             raise(e)
# def get_wiki_client():
#     user_agent = "HistoraXplorer/1.0 (https://github.com/VishalBhat07/histora-xplore; sushanthjoshi.cs23@rvce.edu.in)"
#     wiki = wikipediaapi.Wikipedia(
#         user_agent,
#         'en'
#     )
#     return wiki
# def get_historical_summary(area_name, year):
#     try:
#         wiki = get_wiki_client()
#         print("entered history summmary:")
#         search_terms = [
#             f"{area_name} history",
#             f"{area_name} historical events",
#             area_name
#         ]
#         all_content = []
#         for term in search_terms:
#             page = wiki.page(term)
#             if page.exists():
#                 content = page.text
#                 print(content)
#                 paragraphs = content.split('\n\n')
#                 year_pattern = rf'\b{year}\b'
#                 era_start = max(1200, year - 50) 
#                 era_end = min(2024, year + 50)

#                 for para in paragraphs:
#                     if (re.search(year_pattern, para) or 
#                         any(str(y) in para for y in range(era_start, era_end + 1))):
#                         all_content.append(para)
#         if not all_content:
#             return f"No historical information found for {area_name} around {year}."

#         summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
#         combined_text = ' '.join(all_content)
#         max_chunk_length = 1024
#         chunks = [combined_text[i:i + max_chunk_length] 
#                  for i in range(0, len(combined_text), max_chunk_length)]
        
#         summaries = []
#         for chunk in chunks[:3]:
#             summary = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
#             summaries.append(summary[0]['summary_text'])
#         print(' '.join(summaries))
#         return jsonify({
#             "status": "success",
#             "area": area_name,
#             "historical_summaries":'.'.join(summaries),
#             "year": year
#         })

#         # print(f"Error getting history for{area_name}")


#     except Exception as e:
#         return jsonify({
#             "status": "error",
#             "message": str(e)
#         }), 500
# # Models
# class Login(db.Model):
#     id=db.Column(db.Integer,primary_key=True)
#     usrnme=db.Column(db.String(50),nullable=False)
#     pswd=db.Column(db.String(100),nullable=False)
#     email=db.Column(db.String(100),nullable=False)
#     def to_dict(self):
#         return{
#             'id':self.id,
#             'user':self.usrnme,
#             'pswd':self.pswd,
#             'email':self.email,
            
#         }
# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user=db.Column(db.String(100),nullable=False)
#     title = db.Column(db.String(100), nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     votes = db.Column(db.Integer, default=0)   
#     comments = db.relationship('Comment', backref='post', lazy=True)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user':self.user,
#             'title': self.title,
#             'content': self.content,
#             'created_at': self.created_at.isoformat(),
#             'votes': self.votes,
#             'comments': [comment.to_dict() for comment in self.comments]
#         }

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user':self.user,
#             'content': self.content,
#             'created_at': self.created_at.isoformat(),
#             'post_id': self.post_id
#         }

# with app.app_context():
#     db.create_all()
# @app.route('/api/posts', methods=['GET'])
# def get_posts():
#     posts = Post.query.order_by(Post.votes.desc()).all()
#     return jsonify([post.to_dict() for post in posts])
# @app.route('/api/posts', methods=['POST'])
# def create_post():
#     data = request.get_json()
    
#     if not data or 'title' not in data or 'content' not in data:
#         return jsonify({'error': 'Missing required fields'}), 400
    
#     new_post = Post(
#         title=data['title'],
#         content=data['content']
#     )
    
#     db.session.add(new_post)
#     db.session.commit()
    
#     return jsonify(new_post.to_dict()), 201

# @app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
# def add_comment(post_id):
#     data = request.get_json()
    
#     if not data or 'content' not in data:
#         return jsonify({'error': 'Missing content'}), 400
    
#     post = Post.query.get_or_404(post_id)
#     new_comment = Comment(
#         content=data['content'],
#         post_id=post_id
#     )
    
#     db.session.add(new_comment)
#     db.session.commit()
    
#     return jsonify(new_comment.to_dict()), 201

# @app.route('/api/posts/<int:post_id>/vote', methods=['POST'])
# def vote_post(post_id):
#     data = request.get_json()
#     if 'direction' not in data:
#         return jsonify({'error': 'Missing vote direction'}), 400
    
#     post = Post.query.get_or_404(post_id)
#     if data['direction'] == 'up':
#         post.votes += 1
#     elif data['direction'] == 'down':
#         post.votes -= 1
    
#     db.session.commit()
#     return jsonify(post.to_dict())
# @app.route('/register',methods=['POST'])
# def insert_user():
#     #hasher=hashlib.sha256()
#     data=request.get_json()
#     usr=data['name']
#     pswd=data['password']
#     email=data['email']
#     # binpswd=b' '.join(format(x, 'b').zfill(8) for x in bytearray(pswd, 'utf-8'))
#     # hasher.update(binpswd)
#     # pswd=hasher.hexdigest()
#     new_usr=Login(
#         usrnme=usr,
#         pswd=pswd,
#         email=email
#     )
#     db.session.add(new_usr)
#     print("added")
#     db.session.commit()
#     return jsonify(new_usr.to_dict()),200

if __name__ == '__main__':
    app.run(debug=True)