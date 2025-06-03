import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import { markViewVisited } from '../data/userProgress';
import './Destination.css';

const Mars = () => {
  const viewerRef = useRef(null);
  const navigate = useNavigate();
  const [imageOptions, setImageOptions] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const viewerInstanceRef = useRef(null);
  const panoramaMapRef = useRef({});

  const inspirationalDescriptions = {
    "Lookout Panorama from Spirit":
      "From the summit of “Larry’s Lookout,” Spirit reveals a world not just of dust and stone — but of perspective...",
    "Spirit Mars Rover in McMurdo Panorama":
      "Spirit’s winter haven — still, resilient, and patient...",
    // ... keep the rest of your existing inspirationalDescriptions
  };

  useEffect(() => {
    const fetchMarsPanoramas = async () => {
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=mars%20panorama&media_type=image`
        );
        const data = await response.json();
        const items = data.collection.items;

        const filtered = items.slice(0, 10).map((item, index) => {
          const href = item.links?.[0]?.href;
          const title = item.data?.[0]?.title || 'Untitled';
          const fallback = item.data?.[0]?.description || '';
          const description = inspirationalDescriptions[title] || fallback;
          return href && title
            ? {
                id: `mars-${index + 1}`,
                href,
                title,
                description,
              }
            : null;
        }).filter(Boolean);

        setImageOptions(filtered);

        if (filtered.length > 0) {
          const first = filtered[0];
          setSelectedImageUrl(first.href);
          setImageTitle(first.title);
          setImageDescription(first.description);
          updateUserProgress(first.id, 'completed'); // Mark first view as complete
        }
      } catch (error) {
        console.error('Error fetching Mars panoramas:', error);
      }
    };

    fetchMarsPanoramas();
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
    infospot.position.set(2000, -500, -1000);
    infospot.addHoverText("Dust Ridge Sector 2", 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  const handleViewChange = (option) => {
    setSelectedImageUrl(option.href);
    setImageTitle(option.title);
    setImageDescription(option.description);
    updateUserProgress(option.id, 'completed'); // ✅ Mark view as visited
  };

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🪐 Mars Mission</h1>
        <p className="image-title">{imageTitle}</p>
        <p className="image-description">{imageDescription}</p>

        <div className="image-selector">
          {imageOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleViewChange(option)}
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

export default Mars;
