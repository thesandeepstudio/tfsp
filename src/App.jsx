import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import RoundedVinyl from "./Pages/RoundedVinyl";
import CircularPoster from "./Pages/CircularPoster";
import FramedPoster from "./Pages/FramedPoster";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rounded-vinyl" element={<RoundedVinyl />} />
        <Route path="/circular-poster" element={<CircularPoster />} />
        <Route path="/framed-poster" element={<FramedPoster />} />
      </Routes>
    </div>
  );
}

export default App;
