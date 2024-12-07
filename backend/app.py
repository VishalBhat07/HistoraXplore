
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from geopy.geocoders import Nominatim
import wikipediaapi
from transformers import pipeline
from groq import Groq
import re,os
os.environ['GROQ_API_KEY']="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"
app = Flask(__name__, 
            static_folder='static',
            static_url_path='')

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

def get_area_name(lat, lng):
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
        return ', '.join(area_parts[:2]) 
    except Exception as e:
        print(f"Error getting location: {e}")
        return None
def get_wiki_client():
    """
    Creates a Wikipedia API client with proper user agent configuration
    following Wikimedia Foundation guidelines
    """
    user_agent = "HistoraXplorer/1.0 (https://github.com/VishalBhat07/histora-xplore; sushanthjoshi.cs23@rvce.edu.in)"
    wiki = wikipediaapi.Wikipedia(
        user_agent,
        'en',
        extract_format=wikipediaapi.ExtractFormat.WIKI
    )
    return wiki

def get_historical_summary(area_name, year):
    try:
        model = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        wiki = get_wiki_client()
        
        # Search strategy with error handling and rate limiting
        search_terms = [
            f"{area_name} history",
            f"{area_name} historical events",
            area_name
        ]

        all_content = []
        for term in search_terms:
            try:
                page = wiki.page(term)
                if page.exists():
                    content = page.text
                    print(content)
                    paragraphs = content.split('\n\n')
                    year_pattern = rf'\b{year}\b'
                    era_start = max(1200, year - 50) 
                    era_end = min(2024, year + 50)

                    relevant_paragraphs = [
                        para for para in paragraphs
                        if (re.search(year_pattern, para) or 
                            any(str(y) in para for y in range(era_start, era_end + 1)))
                    ]
                    all_content.extend(relevant_paragraphs)


                
            except Exception as e:
                print(f"Error processing search term '{term}': {e}")
                continue

        if not all_content:
            return f"No historical information found for {area_name} around {year}."

        # Using Groq for summarization
        summary = model.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "you are a helpful summarizer"
                },
                {
                    "role": "user",
                    "content": f"Summarize {all_content}"
                }
            ],
            model="llama-3.1-70b-versatile"
        )

        return ' '.join(summary)

    except Exception as e:
        print(f"Error getting historical information: {e}")
        return f"Error retrieving historical information for {area_name}."
# def get_historical_summary(area_name, year):
#     try:
#         model = Groq(api_key=os.environ.get("GROQ_API_KEY"))
#         wiki = wikipediaapi.Wikipedia('History_explorer(sushanthjoshi.cs23@rvce.edu.in)','en')
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

#         #summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

#         # combined_text = ' '.join(all_content)
#         # max_chunk_length = 1024
#         # chunks = [combined_text[i:i + max_chunk_length] 
#         #          for i in range(0, len(combined_text), max_chunk_length)]
        
#         # summaries = []
#         # for chunk in chunks[:3]:
#         summary=model.chat.completions.create(
#             messages=[
#                 {
#                     "role":"system",
#                     "content":"you are a helpful summarizer"
#                 },
#                 {
#                     "role":"user",
#                     "content":f"Summarize {all_content}"
#                 }
#             ],
#             model="llama3.1-70b-versatile"
#         )
#         #summaries.append(summary[0]['summary_text'])

#         return ' '.join(summary)

#     except Exception as e:
#         print(f"Error getting historical information: {e}")
#         return f"Error retrieving historical information for {area_name}."

@app.route('/api/coordinates', methods=['POST'])
def handle_coordinates():
    try:
        data = request.json
        lat = data.get('lat')
        lng = data.get('lng')
        year = data.get('year', 2000)
        area_name = get_area_name(lat, lng)
        if not area_name:
            return jsonify({
                "status": "error",
                "message": "Could not identify the area"
            }), 404
        
        historical_summary = get_historical_summary(area_name, year)
        if "Error" in historical_summary:
            return jsonify({
            "status": "error",
            "message": str(e)
            }), 500
        return jsonify({
            "status": "success",
            "area": area_name,
            "historical_summary": historical_summary,
            "coordinates": {"lat": lat, "lng": lng},
            "year": year
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
