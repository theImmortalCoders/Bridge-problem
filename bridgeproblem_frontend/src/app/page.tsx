"use client";
import React from "react";
import ImageComponent from "@/components/ImageComponent";
import RedCar from "@/assets/redCar.png";
import { useApiFetching } from "@/hooks/apiFetching";
import { useApiSending } from "@/hooks/apiSending";

const Home: React.FC = () => {
  const {
    waitingSouthCars,
    waitingNorthCars,
    processingCars,
    processedSouthCars,
    processedNorthCars,
    fetchData,
  } = useApiFetching();

  const { handleAddCar } = useApiSending();

  const handleAddCarNorth = () => {
    handleAddCar("NORTH");
    fetchData();
  };

  const handleAddCarSouth = () => {
    handleAddCar("SOUTH");
    fetchData();
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "600px" }}>
      <h1>waitingSouthCars {waitingSouthCars.length}</h1>
      <h1>waitingNorthCars {waitingNorthCars.length}</h1>
      <h1>processingCars {processingCars.length}</h1>
      <h1>processedSouthCars {processedSouthCars.length}</h1>
      <h1>processedNorthCars {processedNorthCars.length}</h1>

      <button onClick={handleAddCarNorth}>Dodaj car NORTH</button>
      <button onClick={handleAddCarSouth}>Dodaj car SOUTH</button>

      <ImageComponent
        imagePath={RedCar}
        position={{ top: 300, left: 100, rotation: 90 }}
        size={{ width: 100, height: 100 }}
        speed={5}
      />
    </div>
  );
};

export default Home;
