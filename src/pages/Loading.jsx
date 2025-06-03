import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Loading.css';

const Loading = () => {
  const navigate = useNavigate();
  const { planet } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/destination/${planet}`);
    }, 3000); // 3-second warp animation
    return () => clearTimeout(timer);
  }, [navigate, planet]);

  return (
    <div className="loading-container">
      <div className="warp-text">InterStellar Travel Activated</div>
      <div className="stars"></div>
      <div className="warp-tunnel"></div>
    </div>
  );
};

export default Loading;
