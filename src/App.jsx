import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spaceport from './pages/Spaceport';
import Telescope from './pages/Telescope';
import Mission from './pages/Mission';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import Mars from './pages/Mars';
import Saturn from './pages/Saturn';
import Europa from './pages/Europa';
import Sun from './pages/Sun';
import Jupiter from './pages/Jupiter';
import Neptune from './pages/Neptune';
import Axcel from './pages/Axcel';
import Tracker from './pages/Tracker';
import Navbar from './pages/Navbar'; // ✅ correct for your structure

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Add the navbar globally */}
      <Routes>
        <Route path="/" element={<Spaceport />} />
        <Route path="/telescope" element={<Telescope />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/destination/mars" element={<Mars />} />
        <Route path="/destination/saturn" element={<Saturn />} />
        <Route path="/destination/europa" element={<Europa />} />
        <Route path="/destination/sun" element={<Sun />} />
        <Route path="/destination/jupiter" element={<Jupiter />} />
        <Route path="/destination/neptune" element={<Neptune />} />
        <Route path="/destination/axcel" element={<Axcel />} />
        <Route path="/loading/:planet" element={<Loading />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
