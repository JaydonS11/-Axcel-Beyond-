// src/pages/Tracker.jsx
import React, { useEffect, useState } from 'react';
import { getUserProgress } from '../data/userProgress';
import './Tracker.css';

export const missionsByPlanet = {
  mars: [
    { id: 'mars-1', name: 'Survey Dust Ridge' },
    { id: 'mars-2', name: 'Analyze Ice Crater' },
    { id: 'mars-3', name: 'Collect Soil Samples' },
    { id: 'mars-4', name: 'Explore Polar Caps' },
    { id: 'mars-5', name: 'Capture Olympus Mons' },
    { id: 'mars-6', name: 'Examine Dust Storms' },
  ],
  saturn: [
    { id: 'saturn-1', name: "Orbit Ring System" },
    { id: 'saturn-2', name: "Scan Titan's Atmosphere" },
    { id: 'saturn-3', name: 'Study Magnetic Field' },
    { id: 'saturn-4', name: 'Cassini Legacy Tour' }
  ],
  europa: [
    { id: 'europa-1', name: 'Drill Ice Sheet' },
    { id: 'europa-2', name: 'Deploy Submersible' },
    { id: 'europa-3', name: 'Track Ice Movement' },
  ],
  sun: [
    { id: 'sun-1', name: 'Observe Solar Flares' },
    { id: 'sun-2', name: 'Map Coronal Loops' },
    { id: 'sun-3', name: 'Analyze Radiation Levels' },
  ],
  jupiter: [
    { id: 'jupiter-1', name: 'Storm Watch at Red Spot' },
    { id: 'jupiter-2', name: 'Infrared Mapping' },
    { id: 'jupiter-3', name: "Moons' Orbital Scan" },
  ],
  neptune: [
    { id: 'neptune-1', name: 'Investigate Triton' },
    { id: 'neptune-2', name: 'Deep Blue Atmosphere Scan' },
    { id: 'neptune-3', name: 'Magnetosphere Study' },
  ],
  axcel: [
    { id: 'axcel-1', name: 'Decode Planetary Glyphs' },
    { id: 'axcel-2', name: 'Trace the Shooting Star Ring' },
    { id: 'axcel-3', name: 'Unlock the Core Signal' },
  ],
};

const Tracker = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  return (
    <div className="tracker-page">
      <h1>🛰️ Mission Tracker</h1>
      <p>Track your journey across the Axcelverse.</p>

      <div className="planet-progress-grid">
        {Object.keys(missionsByPlanet).map((planet) => {
          const totalCount = missionsByPlanet[planet].length;
          const visitedViews = progress[planet] || [];
          const completedCount = visitedViews.length;
          const percent = Math.round((completedCount / totalCount) * 100);

          return (
            <div key={planet} className="planet-card">
              <h2>{planet.charAt(0).toUpperCase() + planet.slice(1)}</h2>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="progress-label">{completedCount}/{totalCount}</span>
              </div>
              <ul className="view-list">
                {missionsByPlanet[planet].map((mission) => (
                  <li
                    key={mission.id}
                    className={visitedViews.includes(mission.id) ? 'view-completed' : ''}
                  >
                    {mission.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;
