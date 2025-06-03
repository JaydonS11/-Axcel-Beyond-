import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PANOLENS from 'panolens';
import './Destination.css';
import { markViewVisited } from '../data/userProgress';

const Axcel = () => {
  const viewerRef = useRef(null);
  const navigate = useNavigate();
  const viewerInstanceRef = useRef(null);
  const panoramaRef = useRef(null);

  const imagePath = '/images/axcel_panorama.png'; // Must be inside /public/images/

  useEffect(() => {
    if (!viewerRef.current || !imagePath) return;

    if (!viewerInstanceRef.current) {
      viewerInstanceRef.current = new PANOLENS.Viewer({
        container: viewerRef.current,
        autoRotate: true,
        autoRotateSpeed: 0.4,
        controlBar: false,
      });
    }

    const panorama = new PANOLENS.ImagePanorama(imagePath);
    panoramaRef.current = panorama;

    const infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
    infospot.position.set(1400, -300, -1000);
    infospot.addHoverText("✨ Welcome to Axcel — The Ascension Frontier", 30);
    panorama.add(infospot);

    viewerInstanceRef.current.add(panorama);
    viewerInstanceRef.current.setPanorama(panorama);

    markViewVisited('axcel', 'axcel-1'); // ✅ Tracking the Axcel mission view

    return () => {
      viewerInstanceRef.current.remove(panorama);
    };
  }, []);

  return (
    <div className="destination-360">
      <div ref={viewerRef} className="panorama-container" />
      <div className="mission-ui">
        <h1>🌌 Axcel Mission</h1>
        <p className="image-title">The Hidden Planet</p>
        <p className="image-description">
          A place beyond logic — where creativity orbits freely and stars speak in silence.
        </p>
        <button onClick={() => navigate('/telescope')}>Return to Spaceport</button>
      </div>
    </div>
  );
};

export default Axcel;
