import React, { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [haiku, setHaiku] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Haiku templates
  const haikuTemplates = [
    "The {word} blooms bright,\nSpring whispers in the morning light,\nNature's gift takes flight.",
    "Silent {word} falls,\nWinter's breath upon the walls,\nPeace in nature calls.",
    "Golden {word} shines,\nSummer's warmth in perfect lines,\nTime in beauty dines.",
    "Crimson {word} glows,\nAutumn's dance in evening shows,\nLife's cycle flows.",
    "Soft {word} drifts by,\nMoonlight dances in the sky,\nNight's sweet lullaby.",
    "Bold {word} stands tall,\nMountains echo nature's call,\nMajestic and all.",
    "Sweet {word} in bloom,\nBees dance in the afternoon,\nNature's sweet perfume.",
    "Wild {word} runs free,\nThrough the fields and over sea,\nWild as it can be.",
    "Quiet {word} sleeps,\nUnder stars the night sky keeps,\nPeaceful dreams it reaps.",
    "Bright {word} shines clear,\nMorning light is drawing near,\nDaybreak's song to hear."
  ];

  const generateHaiku = (word) => {
    const randomTemplate = haikuTemplates[Math.floor(Math.random() * haikuTemplates.length)];
    return randomTemplate.replace(/{word}/g, word);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!word.trim()) {
        setError('Please enter a word');
        return;
      }
      
      const generatedHaiku = generateHaiku(word);
      setHaiku(generatedHaiku);
      
      // Store in localStorage for persistence
      const haikus = JSON.parse(localStorage.getItem('haikus') || '[]');
      haikus.push({
        word: word,
        haiku: generatedHaiku,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('haikus', JSON.stringify(haikus));
      
    } catch (err) {
      setError('Failed to generate haiku. Please try again.');
      console.error(err);
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