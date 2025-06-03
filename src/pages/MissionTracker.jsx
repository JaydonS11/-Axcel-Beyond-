import React from 'react';
import './MissionTracker.css';
import { getUserProgress } from '../data/userProgress';

const allPlanetViews = {
  mars: 10,      // These can be dynamic if needed
  saturn: 4,
  europa: 4,
  jupiter: 2,
  neptune: 3,
  sun: 1,
  axcel: 1
};

const MissionTracker = () => {
  const progress = getUserProgress();

  return (
    <div className="mission-tracker">
      <h2>🚀 Mission Tracker</h2>
      <ul>
        {Object.entries(allPlanetViews).map(([planet, totalViews]) => {
          const completedViews = progress[planet]?.length || 0;
          const isComplete = completedViews === totalViews;

          return (
            <li key={planet} className="planet-progress">
              <span className="planet-name">🌍 {planet.charAt(0).toUpperCase() + planet.slice(1)}</span>
              <span className="view-status">
                {completedViews} / {totalViews} views explored {isComplete ? '✅' : ''}
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(completedViews / totalViews) * 100}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MissionTracker;
