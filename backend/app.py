from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
import random
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins in production

# Initialize Firebase
try:
    # Check if we're running on Heroku
    if os.environ.get('FIREBASE_CREDENTIALS'):
        # Use environment variable for credentials
        import json
        cred_dict = json.loads(os.environ['FIREBASE_CREDENTIALS'])
        cred = credentials.Certificate(cred_dict)
    else:
        # Use local credentials file
        cred = credentials.Certificate("aifund-interview-firebase-adminsdk-fbsvc-a76b9a7150.json")
    
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logger.info("Firebase initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Firebase: {str(e)}")

# Sample haiku templates
haiku_templates = [
    "The {word} blooms bright,\nSpring whispers in the morning light,\nNature's gift takes flight.",
    "Silent {word} falls,\nWinter's breath upon the walls,\nPeace in nature calls.",
    "Golden {word} shines,\nSummer's warmth in perfect lines,\nTime in beauty dines.",
    "Crimson {word} glows,\nAutumn's dance in evening shows,\nLife's cycle flows.",
]

def generate_haiku(word):
    template = random.choice(haiku_templates)
    return template.format(word=word)

@app.route('/generate-haiku', methods=['POST', 'OPTIONS'])
def generate_haiku_endpoint():
    if request.method == 'OPTIONS':
        return '', 200
        
    logger.info("Received request to generate haiku")
    try:
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        if not data:
            logger.error("No JSON data received")
            return jsonify({'error': 'No data received'}), 400
            
        word = data.get('word', '')
        logger.debug(f"Word received: {word}")
        
        if not word:
            logger.error("No word provided")
            return jsonify({'error': 'Please provide a word'}), 400
        
        haiku = generate_haiku(word)
        logger.debug(f"Generated haiku: {haiku}")
        
        # Store in Firebase
        try:
            haiku_data = {
                'word': word,
                'haiku': haiku,
                'timestamp': firestore.SERVER_TIMESTAMP
            }
            db.collection('haikus').add(haiku_data)
            logger.info("Haiku stored in Firebase successfully")
        except Exception as e:
            logger.error(f"Error storing in Firebase: {str(e)}")
        
        return jsonify({'haiku': haiku})
    except Exception as e:
        logger.error(f"Error in generate_haiku_endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False) 