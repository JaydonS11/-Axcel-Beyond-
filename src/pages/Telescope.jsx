import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Telescope.css';

const destinations = [
  { name: 'Sun', path: 'sun' },        // ☀️ Added at the top
  { name: 'Mars', path: 'mars' },
  { name: 'Saturn', path: 'saturn' },
  { name: 'Europa', path: 'europa' },
  { name: 'Jupiter', path: 'jupiter' },
  { name: 'Neptune', path: 'neptune' },
  { name: "Axcel'", path: 'axcel' }    // 🌌 Custom Easter Egg
];

const Telescope = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('astronautName');
    if (storedName) setName(storedName);
  }, []);

  const handleClick = (planet) => {
    navigate(`/loading/${planet}`);
  };

  return (
    <div className="telescope-container">
      <h1>🔭 Welcome back, {name}.</h1>
      <p>Select your destination:</p>
      <div className="destination-grid">
        {destinations.map((planet) => (
          <button
            key={planet.name}
            className="planet-button"
            onClick={() => handleClick(planet.path)}
          >
            {planet.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Telescope;
