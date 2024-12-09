
# from flask import Flask, send_from_directory, request, jsonify
# from flask_cors import CORS
# from geopy.geocoders import Nominatim
# import wikipediaapi
# from transformers import pipeline
# from groq import Groq
# import re,os
# os.environ['GROQ_API_KEY']="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"
# app = Flask(__name__, 
#             static_folder='static',
#             static_url_path='')

# @app.route('/')
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')

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
# #             f"{area_name} histoguidelines
#     """
#     user_agent = "HistoraXplorer/1.0 (https://github.com/VishalBhat07/histora-xplore; sushanthjoshi.cs23@rvce.edu.in)"
#     wiki = wikipediaapi.Wikipedia(
#         user_agent,
#         'en',
#         extract_format=wikipediaapi.ExtractFormat.WIKI
#     )
#     return wiki

# # def get_historical_summary(area_name, year):
# #     try:
# #         model = Groq(api_key=os.environ.get("GROQ_API_KEY"))
# #         wiki = get_wiki_client()
        
# #         # Search strategy with error handling and rate limiting
# #         search_terms = [
# #             f"{area_name} history",
# #             f"{area_name} historical events",
# #             area_name
# #         ]

# #         all_content = []
# #         for term in search_terms:
# #             try:
# #                 page = wiki.page(term)
# #                 if page.exists():
# #                     content = page.text
# #                     print(content)
# #                     paragraphs = content.split('\n\n')
# #                     year_pattern = rf'\b{year}\b'
# #                     era_start = max(1200, year - 50) 
# #                     era_end = min(2024, year + 50)

# #                     relevant_paragraphs = [
# #                         para for para in paragraphs
# #                         if (re.search(year_pattern, para) or 
# #                             any(str(y) in para for y in range(era_start, era_end + 1)))
# #                     ]
# #                     all_content.extend(relevant_paragraphs)


                
# #             except Exception as e:
# #                 print(f"Error p
# #             f"{area_name} histo
# #             return f"No historical information found for {area_name} around {year}."

# #         # Using Groq for summarization
# #         summary = model.chat.completions.create(
# #             messages=[
# #                 {
# #                     "role": "system",
# #                     "content": "you are a helpful summarizer"
# #                 },
# #                 {
# #                     "role": "user",
# #                     "content": f"Summarize {all_content}"
# #                 }
# #             ],
# #             model="llama-3.1-70b-versatile"
# #         )

# #         return ' '.join(summary)

# #     except Exception as e:
# #         print(f"Error getting historical information: {e}")
# #         return f"Error retrieving historical information for {area_name}."
# def get_historical_summary(area_name, year):
#     try:
#         model = Groq(api_key=os.e
# #             f"{area_name} histo",
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
#         return ' '.join(summaries)
#         # if not all_content:
#         #     return f"No historical information found for {area_name} around {year}."

#         # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

#         # combined_text = ' '.join(all_content)
#         # max_chunk_length = 1024
#         # chunks = [combined_text[i:i + max_chunk_length] 
#         #          for i in range(0, len(combined_text), max_chunk_length)]
        
#         # summaries = []
#         # for chunk in chunks[:3]:
#         #summary=model.chat.completions.create(
#         #     messages=[
#         #         {
#         #             "role":"system",
#         #             "content":"you are a helpful summarizer"
#         #         },
#         #         {
#         #             "role":"user",
#         #             "content":f"Summarize {all_content}"
#         #         }
#         #     ],
#         #     model="llama3.1-70b-versatile"
#         # )
#         #summaries.append(summary[0]['summary_text'])

#         #return ' '.join(summary)

#     except Exception as e:
#         print(f"Error getting hi
# #             f"{area_name} histo
#             "status": "success",
#             "area": area_name,
#             "historical_summary": historical_summary,
#             "coordinates": {"lat": lat, "lng": lng},
#             "year": year
#         })

#     except Exception as e:
#         return jsonify({
#             "status": "error",
#             "message": str(e)
#         }), 500


# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__, 
            static_folder='static',
            static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///forum.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    votes = db.Column(db.Integer, default=0)   
    comments = db.relationship('Comment', backref='post', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'votes': self.votes,
            'comments': [comment.to_dict() for comment in self.comments]
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'post_id': self.post_id
        }

with app.app_context():
    db.create_all()


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')
@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.votes.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    
    if not data or 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_post = Post(
        title=data['title'],
        content=data['content']
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify(new_post.to_dict()), 201

@app.route('/api/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({'error': 'Missing content'}), 400
    
    post = Post.query.get_or_404(post_id)
    new_comment = Comment(
        content=data['content'],
        post_id=post_id
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify(new_comment.to_dict()), 201

@app.route('/api/posts/<int:post_id>/vote', methods=['POST'])
def vote_post(post_id):
    data = request.get_json()
    if 'direction' not in data:
        return jsonify({'error': 'Missing vote direction'}), 400
    
    post = Post.query.get_or_404(post_id)
    if data['direction'] == 'up':
        post.votes += 1
    elif data['direction'] == 'down':
        post.votes -= 1
    
    db.session.commit()
    return jsonify(post.to_dict())

if __name__ == '__main__':
    app.run(debug=True, port=3000)