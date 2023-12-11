"use client";
// Home.tsx
import React from "react";
import ImageComponent from "@/components/ImageComponent";
import RedCar from "@/assets/redCar.png";

const Home: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "400px", width: "600px" }}>
      <h1>O kurwa to działa</h1>
      <ImageComponent
        imagePath={RedCar}
        position={{ top: 100, left: 100, rotation: 90 }}
        size={{ width: 150, height: 100 }} // Specify width and height
        speed={2}
      />
    </div>
  );
};

export default Home;
