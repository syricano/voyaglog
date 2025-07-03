import { useState } from "react";

const HeroFlip = ({ frontImage, backImage, altFront = "Front", altBack = "Back" }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <div
        onClick={() => setFlipped(!flipped)}
        className={`relative w-full max-w-4xl h-96 mx-auto cursor-pointer perspective`}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full h-full duration-700 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.7s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Image */}
          <img
            src={frontImage}
            alt={altFront}
            className="absolute w-full h-full object-cover backface-hidden rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          />

          {/* Back Image */}
          <img
            src={backImage}
            alt={altBack}
            className="absolute w-full h-full object-cover rotate-y-180 backface-hidden rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              top: 0,
              left: 0,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroFlip;
