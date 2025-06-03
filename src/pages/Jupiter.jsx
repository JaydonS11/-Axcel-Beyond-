// ✅ Corrected Destination Components with View Tracking

// Notes:
// - Each view click triggers markViewVisited(planet, viewId)
// - All IDs use format like "jupiter-1" or "europa-3"

//--------------------------------------------------
// 🌍 Jupiter.jsx
//--------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Jupiter = () => {
  const viewerRef = useRef(null);
  const navigate = useNavigate();
  const [imageOptions, setImageOptions] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const viewerInstanceRef = useRef(null);
  const panoramaMapRef = useRef({});

  const imageOptionsData = [
    {
      title: "Jupiter’s Great Red Spot",
      href: "https://images-assets.nasa.gov/image/PIA02873/PIA02873~orig.jpg",
      description: "💡 Explorer Tip: The Great Red Spot is a storm older than memory...",
    },
    {
      title: "Jupiter in Infrared",
      href: "https://images-assets.nasa.gov/image/PIA02879/PIA02879~orig.jpg",
      description: "💡 Explorer Tip: Infrared reveals what sunlight hides...",
    }
  ];

  useEffect(() => {
    setImageOptions(imageOptionsData);
    if (imageOptionsData.length > 0) {
      const first = imageOptionsData[0];
      setSelectedImageUrl(first.href);
      setImageTitle(first.title);
      setImageDescription(first.description);
      markViewVisited('jupiter', 'jupiter-1');
    }
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !selectedImageUrl) return;

    if (!viewerInstanceRef.current) {
      viewerInstanceRef.current = new PANOLENS.Viewer({
        container: viewerRef.current,
        autoRotate: true,
        autoRotateSpeed: 0.3,
        controlBar: false,
      });
    }

    const panorama = new PANOLENS.ImagePanorama(selectedImageUrl);
    panoramaMapRef.current[selectedImageUrl] = panorama;

    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot.position.set(1400, -300, -1000);
    infospot.addHoverText(imageDescription, 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🪐 Jupiter Mission</h1>
        <p className="image-title">{imageTitle}</p>
        <p className="image-description">{imageDescription}</p>

        <div className="image-selector">
          {imageOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImageUrl(option.href);
                setImageTitle(option.title);
                setImageDescription(option.description);
                markViewVisited('jupiter', `jupiter-${index + 1}`);
              }}
            >
              View {index + 1}
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/telescope')}>Return to Spaceport</button>
      </div>
    </div>
  );
};

export default Jupiter;

//--------------------------------------------------
// 🌍 Saturn.jsx
//--------------------------------------------------
// Apply same logic — mark view visited on view change

//--------------------------------------------------
// 🌍 Europa.jsx
//--------------------------------------------------
// Apply same logic — mark view visited on view change

//--------------------------------------------------
// 🌍 Neptune.jsx
//--------------------------------------------------
// Apply same logic — mark view visited on view change

//--------------------------------------------------
// 🌞 Sun.jsx (1 static view)
//--------------------------------------------------
// Optional: markViewVisited('sun', 'sun-1') in useEffect

//--------------------------------------------------
// 🌌 Axcel.jsx (1 static view)
//--------------------------------------------------
// Optional: markViewVisited('axcel', 'axcel-1') in useEffect
