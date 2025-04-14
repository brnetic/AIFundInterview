# Haiku Generator

A web application that generates haikus based on user input words. Built with React, Flask, and Firebase.

## Features

- User-friendly interface
- Real-time haiku generation
- Firebase integration for storing generated haikus
- Responsive design

## Live Demo

The application is deployed at: [https://brnetic.github.io/haiku-generator](https://brnetic.github.io/haiku-generator)

## Project Structure

- `frontend/`: React application
- `backend/`: Flask server and Firebase integration

## Setup

1. Clone the repository:
```bash
git clone https://github.com/brnetic/AIFundInterview.git
```

2. Frontend setup:
```bash
cd frontend
npm install
npm start
```

3. Backend setup:
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Technologies Used

- React.js
- Flask
- Firebase
- GitHub Pages
- Render (for backend hosting)

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- Firebase account and project

## How to Use

1. Enter a word in the input field
2. Click "Generate Haiku"
3. View your generated haiku
4. The haiku will be automatically stored in Firebase

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

## Project Structure

- `backend/`: Flask server and Firebase integration
- `frontend/`: React application
- `firebase-credentials.json`: Firebase service account key (not included in repo) 