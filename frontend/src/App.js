import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Use environment variable for backend URL, fallback to deployed URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://aifundinterview.onrender.com';

function App() {
  const [word, setWord] = useState('');
  const [haiku, setHaiku] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debug component mounting
  useEffect(() => {
    console.log('App component mounted');
    console.log('Backend URL:', BACKEND_URL);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Sending request with word:', word);
      const response = await axios.post(`${BACKEND_URL}/generate-haiku`, {
        word: word
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response received:', response.data);
      setHaiku(response.data.haiku);
    } catch (err) {
      console.error('Error details:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Error: ${err.response.data.error || 'Failed to generate haiku'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up the request');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Haiku Generator</h1>
        <form onSubmit={handleSubmit} className="haiku-form">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Haiku'}
          </button>
        </form>
        
        {error && <p className="error">{error}</p>}
        
        {haiku && (
          <div className="haiku-display">
            {haiku.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App; 