import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [haiku, setHaiku] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const haikuTemplates = [
    {
      lines: [
        "A gentle breeze blows",
        "Through the trees and flowers bright",
        "Nature's sweet embrace"
      ]
    },
    {
      lines: [
        "Moonlight on water",
        "Ripples dance in silver light",
        "Night's quiet beauty"
      ]
    },
    {
      lines: [
        "Mountains touch the sky",
        "Clouds drift by in endless blue",
        "Peace fills the valley"
      ]
    }
  ];

  const generateHaiku = (word) => {
    const template = haikuTemplates[Math.floor(Math.random() * haikuTemplates.length)];
    return template.lines.join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsLoading(true);
    try {
      const newHaiku = generateHaiku(word);
      setHaiku(newHaiku);
      
      // Save to localStorage
      const savedHaikus = JSON.parse(localStorage.getItem('haikus') || '[]');
      savedHaikus.unshift({
        word,
        haiku: newHaiku,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('haikus', JSON.stringify(savedHaikus));
    } catch (error) {
      console.error('Error generating haiku:', error);
    } finally {
      setIsLoading(false);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Haiku'}
          </button>
        </form>
        
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