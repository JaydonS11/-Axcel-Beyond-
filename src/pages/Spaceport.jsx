import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Spaceport.css';

const Spaceport = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('astronautName', name);
      navigate('/telescope');
    }
  };

  return (
    <div className="spaceport-container">
      <h1>👨‍🚀 Welcome to Axcel Station</h1>
      <p>Before launch, what's your name, explorer?</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Enter the Spaceport</button>
      </form>

      <button
        className="tracker-button"
        onClick={() => navigate('/tracker')}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: 'none',
          background: '#00ff88',
          color: '#000',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        🛰️ View Mission Tracker
      </button>
    </div>
  );
};

export default Spaceport;
