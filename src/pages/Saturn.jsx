import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Saturn = () => {
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
      title: "Saturn's Rings from Cassini",
      href: "https://images-assets.nasa.gov/image/PIA12567/PIA12567~orig.jpg",
      description: "💡 Explorer Tip: Saturn’s rings are not solid — they’re composed of icy particles. Always respect the orbit paths. Set intentions, not collisions.",
    },
    {
      title: "Saturn's North Polar Hexagon",
      href: "https://images-assets.nasa.gov/image/PIA11682/PIA11682~orig.jpg",
      description: "💡 Explorer Tip: The polar hexagon is a perfect storm. Stay centered, even when caught in geometry of chaos.",
    },
    {
      title: "Titan Surface View",
      href: "https://images-assets.nasa.gov/image/PIA20016/PIA20016~orig.jpg",
      description: "💡 Explorer Tip: Titan’s haze is thick — but truth always breaks through. Equip sensors tuned to what the eye cannot see.",
    },
    {
      title: "Saturn Aurora",
      href: "https://images-assets.nasa.gov/image/PIA11667/PIA11667~orig.jpg",
      description: "💡 Explorer Tip: Magnetic waves here are intense. Shield your energy and meditate with the aurora. Breathe between the beams.",
    }
  ];

  useEffect(() => {
    setImageOptions(imageOptionsData);
    if (imageOptionsData.length > 0) {
      const first = imageOptionsData[0];
      setSelectedImageUrl(first.href);
      setImageTitle(first.title);
      setImageDescription(first.description);
      markViewVisited('saturn', 'saturn-1');
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
    infospot.position.set(1000, 0, -1000);
    infospot.addHoverText(imageDescription, 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🪐 Saturn Mission</h1>
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
                markViewVisited('saturn', `saturn-${index + 1}`);
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

export default Saturn;
