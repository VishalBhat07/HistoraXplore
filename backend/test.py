# from flask import Flask, send_from_directory,request, jsonify
# from flask_cors import CORS
# from geopy.geocoders import Nominatim
# import wikipediaapi as wikipedia
# from transformers import pipeline
# import re

# app = Flask(__name__, 
#             static_folder='static',
#             static_url_path='')

# @app.route('/')
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')

# # @app.post('/api')
# # def handle_coordinates():
# #     print("hihihihihihihihi")
# #     data = request.json
# #     lat = data.get('lat')
# #     lng = data.get('lng')
# #     # Process coordinates here
# #     print(f"Received coordinates: Lat {lat}, Lng {lng}")
    
# #     return jsonify({
# #         "status": "success",
# #         "message": "Coordinates received",
# #         "coordinates": {"lat": lat, "lng": lng}
# #     })
# # @app.route('/api/test')
# # def test():
# #     return {"message": "API is working"}

# # if __name__ == '__main__':
# #     app.run(debug=True)
# def get_area_name(lat, lng):
#     try:
#         geolocator = Nominatim(user_agent="my_app")
#         location = geolocator.reverse(f"{lat}, {lng}")
        

#         address = location.raw['address']
        

#         area_parts = []
#         if 'city' in address:
#             area_parts.append(address['city'])
#         if 'county' in address:
#             area_parts.append(address['county'])
#         if 'state' in address:
#             area_parts.append(address['state'])
#         if 'country' in address:
#             area_parts.append(address['country'])
            

#         return ', '.join(area_parts[:2]) 
#     except Exception as e:
#         print(f"Error getting location: {e}")
#         return None

# def get_historical_summary(area_name, year):
#     try:
#         wiki=wikipedia.Wikipedia("Histora","en")
#         search_terms = [
#             f"{area_name} history",
#             f"{area_name} historical events",
#             area_name
#         ]
        
#         all_content = []
#         for term in search_terms:
#             try:
#                 search_results = wiki.page(f'{term}')
#                 if search_results.exists():
#                     for result in search_results[:2]: 
#                         try:
#                             page = wikipedia.page(result)
#                             content = page.content
                            
#                             paragraphs = content.split('\n\n')
#                             year_pattern = rf'\b{year}\b'
#                             era_start = max(1700, year - 50) 
#                             era_end = min(2024, year + 50) 
                            
#                             for para in paragraphs:
#                                 if (re.search(year_pattern, para) or 
#                                     any(str(y) in para for y in range(era_start, era_end + 1))):
#                                     all_content.append(para)
                            
#                         except wikipedia.exceptions.DisambiguationError:
#                             continue
#                         except wikipedia.exceptions.PageError:
#                             continue
                            
#             except Exception as e:
#                 print(f"Error with search term {term}: {e}")
#                 continue

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

#         return ' '.join(summaries)

#     except Exception as e:
#         print(f"Error getting historical information: {e}")
#         return f"Error retrieving historical information for {area_name}."

# @app.route('/api/coordinates', methods=['POST'])
# def handle_coordinates():
#     try:
#         data = request.json
#         lat = data.get('lat')
#         lng = data.get('lng')
#         year = data.get('year', 2000)
#         area_name = get_area_name(lat, lng)
#         if not area_name:
#             return jsonify({
#                 "status": "error",
#                 "message": "Could not identify the area"
#             }), 404
        
#         historical_summary = get_historical_summary(area_name, year)

#         return jsonify({
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