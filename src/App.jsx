// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import RoundedVinyl from "./Pages/RoundedVinyl";
import CircularPoster from "./Pages/CircularPoster";
import FramedPoster from "./Pages/FramedPoster";

function App() {
  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />
      <Home />


      {/* Routes handle page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rounded-vinyl" element={<RoundedVinyl />} />
        <Route path="/circular-poster" element={<CircularPoster />} />
        <Route path="/framed-poster" element={<FramedPoster />} />
      </Routes>
    </>
  );
}

export default App;
