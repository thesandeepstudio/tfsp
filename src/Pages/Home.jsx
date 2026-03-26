import { useNavigate } from "react-router-dom";
import Card from "../Components/ui/card";
import RoundVinly from "../assets/Round.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card
        image={RoundVinly}
        title="Rounded Vinyl Poster"
        description="Take a look at how your image looks within the mockup."
        buttonText="Check"
        onClick={() => navigate("/rounded-vinyl")}
      />
      <Card
        image={RoundVinly}
        title="Circular Poster"
        description="Take a look at how your image looks within the mockup."
        buttonText="Check"
        onClick={() => navigate("/circular-poster")}
      />
      <Card
        image={RoundVinly}
        title="Framed Poster"
        description="Take a look at how your image looks within the mockup."
        buttonText="Check"
        onClick={() => navigate("/framed-poster")}
      />
    </div>
  );
}
