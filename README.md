# Haiku Generator

A web application that generates haikus based on user input words. Built with React, Flask, and Firebase.

## Features

- User-friendly interface
- Real-time haiku generation
- Firebase integration for storing generated haikus
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- Firebase account and project

## Setup

1. Clone the repository
2. Set up Firebase:
   - Create a new Firebase project
   - Generate a service account key (JSON file)
   - Place the service account key as `firebase-credentials.json` in the backend directory

3. Backend setup:
```bash
cd backend
pip install -r requirements.txt
```

4. Frontend setup:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Enter a word in the input field
2. Click "Generate Haiku"
3. View your generated haiku
4. The haiku will be automatically stored in Firebase

## Project Structure

- `backend/`: Flask server and Firebase integration
- `frontend/`: React application
- `firebase-credentials.json`: Firebase service account key (not included in repo) 