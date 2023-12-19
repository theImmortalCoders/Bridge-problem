import React, { useState } from "react";
import Image from "next/image";

interface ImageComponentProps {
  index: number;
  source: string;
  processingTime: number;
}

const CarComponent: React.FC<ImageComponentProps> = ({
  index,
  source,
  processingTime,
}) => {
  const rotateValue = source === "NORTH" ? 90 : -90;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={index}
      className={`flex flex-col justify-center items-center px-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`/${source === "NORTH" ? "red" : "blue"}Car.png`}
        alt=""
        width={100}
        height={100}
        style={{ transform: `rotate(${rotateValue}deg)` }}
        className={`relative ${
          rotateValue === 90 ? "rotate-90" : "-rotate-90"
        } ${isHovered ? "hovered" : ""}`}
      />
      {isHovered && (
        <span className="bg-slate-600 p-2 rounded-md absolute top-[-1vh] text-[30px]">
          Travel Time: {processingTime / 1000}s
        </span>
      )}
    </div>
  );
};

export default CarComponent;
