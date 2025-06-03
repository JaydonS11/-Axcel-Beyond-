import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Sun = () => {
  const viewerRef = useRef(null);
  const navigate = useNavigate();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const viewerInstanceRef = useRef(null);
  const panoramaMapRef = useRef({});

  const imageData = {
    title: "Surface of the Sun",
    href: "https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg",
    description:
      "☀️ This is the Sun’s true face — a boiling ocean of plasma, churning with untamed energy. Let it remind you: your fire, when focused, is a force that can illuminate worlds.",
  };

  useEffect(() => {
    setSelectedImageUrl(imageData.href);
    setImageTitle(imageData.title);
    setImageDescription(imageData.description);
    markViewVisited('sun', 'sun-1');
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !selectedImageUrl) return;

    if (!viewerInstanceRef.current) {
      viewerInstanceRef.current = new PANOLENS.Viewer({
        container: viewerRef.current,
        autoRotate: true,
        autoRotateSpeed: 0.4,
        controlBar: false,
      });
    }

    const panorama = new PANOLENS.ImagePanorama(selectedImageUrl);
    panoramaMapRef.current[selectedImageUrl] = panorama;

    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot.position.set(1600, -300, -1000);
    infospot.addHoverText(imageDescription, 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>☀️ Sun Mission</h1>
        <p className="image-title">{imageTitle}</p>
        <p className="image-description">{imageDescription}</p>
        <button onClick={() => navigate('/telescope')}>Return to Spaceport</button>
      </div>
    </div>
  );
};

export default Sun;
