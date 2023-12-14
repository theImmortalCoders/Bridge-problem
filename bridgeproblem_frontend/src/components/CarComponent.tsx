import React from "react";
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

  return (
    <div
      key={index}
      className={`flex flex-col justify-center items-center px-1`}
    >
      <Image
        src={`/${source === "NORTH" ? "red" : "blue"}Car.png`}
        alt=""
        width={50}
        height={50}
        style={{ transform: `rotate(${rotateValue}deg)` }}
        className={` ${rotateValue === 90 ? "rotate-90" : "-rotate-90"}`}
      />

      {`Travel Time: ${processingTime / 1000}`}
    </div>
  );
};

export default CarComponent;
