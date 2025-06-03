// src/data/userProgress.js

// Load progress from localStorage or initialize
export const getUserProgress = () => {
  const saved = localStorage.getItem('axcelUserProgress');
  if (saved) return JSON.parse(saved);

  return {
    mars: [],
    saturn: [],
    europa: [],
    jupiter: [],
    neptune: [],
    sun: [],
    axcel: []
  };
};

// Save updated progress to localStorage
const saveProgress = (progress) => {
  localStorage.setItem('axcelUserProgress', JSON.stringify(progress));
};

// ✅ Mark a specific view as visited (no duplicates)
export const markViewVisited = (planet, viewId) => {
  const progress = getUserProgress();

  if (!progress[planet]) {
    progress[planet] = [];
  }

  if (!progress[planet].includes(viewId)) {
    progress[planet].push(viewId);
    saveProgress(progress);
  }
};

// ✅ Get number of visited views for a planet
export const getVisitedCount = (planet) => {
  const progress = getUserProgress();
  return progress[planet]?.length || 0;
};

// ✅ Get all visited views (optional helper)
export const getAllVisitedViews = () => {
  return getUserProgress();
};
