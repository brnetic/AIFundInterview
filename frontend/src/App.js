import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [haiku, setHaiku] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const haikuTemplates = [
    {
      lines: [
        "The {word} blooms bright",
        "Spring whispers in morning light",
        "Nature's gift takes flight"
      ]
    },
    {
      lines: [
        "Silent {word} falls",
        "Winter's breath upon the walls",
        "Peace in nature calls"
      ]
    },
    {
      lines: [
        "Golden {word} shines",
        "Summer's warmth in perfect lines",
        "Time in beauty dines"
      ]
    },
    {
      lines: [
        "Crimson {word} glows",
        "Autumn's dance in evening shows",
        "Life's cycle flows"
      ]
    },
    {
      lines: [
        "Soft {word} drifts by",
        "Moonlight dances in the sky",
        "Night's sweet lullaby"
      ]
    }
  ];

  const generateHaiku = (word) => {
    const template = haikuTemplates[Math.floor(Math.random() * haikuTemplates.length)];
    return template.lines.map(line => line.replace('{word}', word)).join('\n');
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