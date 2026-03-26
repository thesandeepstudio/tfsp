import { useState } from "react";
import RoundVinly from "../assets/RoundVinylMockup.png";

export default function RoundedVinyl() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [, setSaved] = useState(false);

  // Controls
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  // Ref to canvas

  // Upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG or PNG images are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setFileName(file.name);
      setSaved(false);

      setScale(1);
      setPosX(0);
      setPosY(0);
    };
    reader.readAsDataURL(file);
  };

  // Save by merging vinyl and uploaded image
  const handleSave = () => {
    if (!uploadedImage) {
      alert("Please upload an image first!");
      return;
    }

    const canvas = document.createElement("canvas");
    const size = 488; // Base size (72px * 4) to match w-72/h-72
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Draw uploaded image
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const scaledWidth = size * scale;
      const scaledHeight = size * scale;
      const dx = posX + (size - scaledWidth) / 2;
      const dy = posY + (size - scaledHeight) / 2;

      // Draw uploaded image
      ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);

      // Draw vinyl mockup on top
      const vinyl = new Image();
      vinyl.src = RoundVinly;
      vinyl.onload = () => {
        ctx.drawImage(vinyl, 0, 0, size, size);

        // Create download link
        const link = document.createElement("a");
        link.download = "vinyl_mockup.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        setSaved(true);
      };
    };
  };

  // Cancel
  const handleCancel = () => {
    setUploadedImage(null);
    setSaved(false);
    setFileName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="flex flex-col md:flex-row items-start gap-8 p-6 max-w-6xl w-full">
        {/* LEFT: Vinyl Preview */}
        <div className="relative flex-1 flex justify-center items-center w-full h-96 md:h-80">
          {uploadedImage && (
            <div className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden flex justify-center items-center z-0">
              <img
                src={uploadedImage}
                alt="Album design"
                className="absolute object-cover"
                style={{
                  transform: `translate(${posX}px, ${posY}px) scale(${scale})`,
                }}
              />
            </div>
          )}

          <img
            src={RoundVinly}
            alt="Vinyl Mockup"
            className="relative z-10 w-64 h-64 md:w-72 md:h-72 object-cover transition-transform hover:scale-105"
          />
        </div>

        {/* RIGHT: Controls */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6 w-full">
          <h1 className="text-2xl font-bold press-start-2p-regular text-center md:text-left">
            Rounded Vinyl Poster Mockup
          </h1>

          {/* Upload */}
          <div className="w-full">
            <label
              className="block text-gray-700 mb-2 press-start-2p-regular"
              style={{ fontSize: "10px" }}
            >
              Upload Album Design
            </label>

            <label
              htmlFor="file-upload"
              className="flex items-center justify-center h-14 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
            >
              <span
                className="text-gray-500 press-start-2p-regular"
                style={{ fontSize: "7px" }}
              >
                {uploadedImage ? fileName : "Click to choose file"}
              </span>

              <input
                id="file-upload"
                type="file"
                accept=".jpg,.png"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Message */}
          {uploadedImage && (
            <p
              className="press-start-2p-regular text-gray-600 leading-relaxed"
              style={{ fontSize: "10px" }}
            >
              Please save this image and send it to us so we can recreate it
              exactly as you uploaded.
            </p>
          )}

          {/* Buttons */}
          {uploadedImage && (
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Save Image
              </button>

              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Controls */}
          {uploadedImage && (
            <div className="w-full mt-6 space-y-4">
              {/* Zoom */}
              <div>
                <label className="text-xs text-gray-600">Zoom</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Move X */}
              <div>
                <label className="text-xs text-gray-600">Move X</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Move Y */}
              <div>
                <label className="text-xs text-gray-600">Move Y</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
