from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from geopy.geocoders import Nominatim
import wikipediaapi
from transformers import pipeline
import re
import os

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Function to fetch the area name using latitude and longitude
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
        return ', '.join(area_parts[:2])  # Return city and state/country
    except Exception as e:
        print(f"Error getting area name: {e}")
        return "Unknown Location"

# Function to fetch historical data from Wikipedia
def get_historical_summary(area_name, year):
    try:
        user_agent = "HistoraXplorer/1.0 (https://github.com/VishalBhat07/histora-xplore)"
        wiki = wikipediaapi.Wikipedia(user_agent, 'en', extract_format=wikipediaapi.ExtractFormat.WIKI)

        # Search for historical information
        search_terms = [f"{area_name} history", f"{area_name} historical events", area_name]
        all_content = []
        for term in search_terms:
            page = wiki.page(term)
            if page.exists():
                content = page.text
                paragraphs = content.split('\n\n')  # Split content into paragraphs
                year_pattern = rf'\b{year}\b'
                era_start, era_end = max(1200, year - 50), min(2024, year + 50)

                # Filter paragraphs based on the year or nearby era
                relevant_paragraphs = [
                    para for para in paragraphs
                    if re.search(year_pattern, para) or any(str(y) in para for y in range(era_start, era_end + 1))
                ]
                all_content.extend(relevant_paragraphs)

        if not all_content:
            return f"No historical information found for {area_name} around {year}."

        # Summarize the content using Hugging Face transformers
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        combined_text = ' '.join(all_content)
        max_chunk_length = 1024
        chunks = [combined_text[i:i + max_chunk_length] for i in range(0, len(combined_text), max_chunk_length)]

        summaries = []
        for chunk in chunks[:3]:  # Limit to the first 3 chunks to avoid overloading
            summary = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
            summaries.append(summary[0]['summary_text'])

        return ' '.join(summaries)
    except Exception as e:
        print(f"Error getting historical summary: {e}")
        return f"Error retrieving historical information for {area_name}."

# API Route to get historical data
@app.route('/api/coordinates', methods=['POST'])
def get_historical_info():
    try:
        data = request.get_json()
        lat = data.get('lat')
        lng = data.get('lng')
        year = data.get('year', 2000)

        if lat is None or lng is None:
            return jsonify({"status": "error", "message": "Latitude and longitude are required."}), 400

        # Get the area name
        area_name = get_area_name(lat, lng)

        # Get the historical summary
        historical_summary = get_historical_summary(area_name, year)

        return jsonify({
            "status": "success",
            "area": area_name,
            "historical_summary": historical_summary,
            "coordinates": {"lat": lat, "lng": lng},
            "year": year
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Route to serve the static index.html
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
