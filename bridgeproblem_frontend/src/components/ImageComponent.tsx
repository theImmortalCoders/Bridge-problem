// ImageComponent.tsx
import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ImageComponentProps {
  imagePath: StaticImageData;
  position: { top: number; left: number; rotation: number };
  size: { width: number; height: number };
  speed: number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  imagePath,
  position,
  size,
  speed,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    const moveImage = () => {
      if (imageRef.current) {
        setCurrentPosition((prevPosition) => ({
          top: prevPosition.top,
          left: prevPosition.left + speed,
          rotation: prevPosition.rotation + position.rotation,
        }));
      }
    };

    const animationFrameId = requestAnimationFrame(moveImage);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <div
      style={{
        position: "absolute",
        top: `${currentPosition.top}px`,
        left: `${currentPosition.left}px`,
        transform: `rotate(${currentPosition.rotation}deg)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <Image {...imagePath} alt="Image" />
    </div>
  );
};

export default ImageComponent;
