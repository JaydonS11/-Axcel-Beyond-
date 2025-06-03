import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Neptune = () => {
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
      title: "Neptune in Blue",
      href: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg",
      description: "💡 Explorer Tip: Neptune hums at the edge of our solar soul. Deep blue and cold, it teaches that beauty is distant — but never unreachable.",
    },
    {
      title: "Neptune with Great Dark Spot",
      href: "https://images-assets.nasa.gov/image/PIA00047/PIA00047~orig.jpg",
      description: "💡 Explorer Tip: That swirling dark spot is a storm that rivals Jupiter’s. Silence can be powerful. Stillness can rage.",
    },
    {
      title: "Triton: Neptune's Moon",
      href: "https://images-assets.nasa.gov/image/PIA00317/PIA00317~orig.jpg",
      description: "💡 Explorer Tip: Triton spins backwards — retrograde and rebellious. Sometimes, the best path is your own orbit.",
    }
  ];

  useEffect(() => {
    setImageOptions(imageOptionsData);
    if (imageOptionsData.length > 0) {
      const first = imageOptionsData[0];
      setSelectedImageUrl(first.href);
      setImageTitle(first.title);
      setImageDescription(first.description);
      markViewVisited('neptune', 'neptune-1');
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
    infospot.position.set(1200, -300, -1000);
    infospot.addHoverText(imageDescription, 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);
  }, [selectedImageUrl]);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🌀 Neptune Mission</h1>
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
                markViewVisited('neptune', `neptune-${index + 1}`);
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

export default Neptune;
