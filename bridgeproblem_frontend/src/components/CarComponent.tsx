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
      <div className="relative">
        <Image
          src={`/${source === "NORTH" ? "red" : "blue"}Car.png`}
          alt=""
          width={50}
          height={50}
          style={{ transform: `rotate(${rotateValue}deg)` }}
          className={` ${rotateValue === 90 ? "rotate-90" : "-rotate-90"} ${
            isHovered ? "hovered" : ""
          }`}
        />
        {isHovered && (
          <h1 className="bg-slate-600 p-2 rounded-md absolute top-[-40px] text-[18px] min-w-[160px] left-[-55px] items-center justify-center">
            Travel Time: {processingTime / 1000}s
          </h1>
        )}
      </div>
    </div>
  );
};

export default CarComponent;
