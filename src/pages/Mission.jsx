import React from "react";
import { missionsByPlanet } from "../data/missions";
import "./Mission.css";

const Mission = () => {
  const planet = window.location.pathname.split("/").pop();
  const missionData = missionsByPlanet[planet.charAt(0).toUpperCase() + planet.slice(1)];

  if (!missionData) {
    return (
      <div className="mission-page">
        <h1>🚀 Mission Not Found</h1>
        <p>We couldn't retrieve your mission data. Please return to the spaceport and try again.</p>
      </div>
    );
  }

  return (
    <div className="mission-page">
      <h1>🚀 {planet.charAt(0).toUpperCase() + planet.slice(1)} Mission Briefing</h1>
      <p>Below are your assignments for this planet. Select one to begin your journey.</p>

      <div className="mission-list">
        {missionData.map((mission) => (
          <div key={mission.id} className="mission-card">
            <h3>{mission.name}</h3>
            <p>{mission.description}</p>
            <button>Engage</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mission;
