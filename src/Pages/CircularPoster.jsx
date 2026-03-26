import { useNavigate } from "react-router-dom";

export default function CircularPoster() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold press-start-2p-regular">
        Circular Poster Page
      </h1>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}
