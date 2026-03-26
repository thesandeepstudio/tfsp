function Card({ image, title, description, buttonText, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2
          className=" font-bold mb-2 
        press-start-2p-regular
        "
          style={{ fontSize: "14px" }}
        >
          {title}
        </h2>
        <p
          className="text-gray-600 flex-1 press-start-2p-regular"
          style={{ fontSize: "9px" }}
        >
          {description}
        </p>

        {/* Button */}
        <button
          onClick={onClick}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition press-start-2p-regular"
          style={{ fontSize: "11px" }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Card;
