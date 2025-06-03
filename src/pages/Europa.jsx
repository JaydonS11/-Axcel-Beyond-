import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Europa = () => {
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
      title: "Surface Fractures on Europa",
      href: "https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg",
      description: "💡 Explorer Tip: Europa’s icy crust is etched with fractures. These lines are not breaks — they’re maps. Let your own scars chart your next direction.",
    },
    {
      title: "Europa Rising Over Jupiter",
      href: "https://images-assets.nasa.gov/image/PIA13564/PIA13564~orig.jpg",
      description: "💡 Explorer Tip: As Europa climbs above Jupiter’s limb, remember: what lies beneath may be mightier than what surrounds. Rise slowly — and fully.",
    },
    {
      title: "Chaos Terrain on Europa",
      href: "https://images-assets.nasa.gov/image/PIA00502/PIA00502~orig.jpg",
      description: "💡 Explorer Tip: The chaos terrain speaks of upheaval and rebirth. Even broken ground can be sacred. Explore where stability once shattered.",
    },
    {
      title: "Ice Rafts of Europa",
      href: "https://images-assets.nasa.gov/image/PIA01403/PIA01403~orig.jpg",
      description: "💡 Explorer Tip: These drifting ice plates float over hidden oceans. Trust that there’s depth even beneath your most frozen moments.",
    }
  ];

  useEffect(() => {
    setImageOptions(imageOptionsData);
    if (imageOptionsData.length > 0) {
      const first = imageOptionsData[0];
      setSelectedImageUrl(first.href);
      setImageTitle(first.title);
      setImageDescription(first.description);
      markViewVisited('europa', 'europa-1');
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
    infospot.position.set(1200, -300, -800);
    infospot.addHoverText(imageDescription, 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🌌 Europa Mission</h1>
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
                markViewVisited('europa', `europa-${index + 1}`);
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

export default Europa;
