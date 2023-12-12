"use client";
import React, { useState } from "react";
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

  const [travelTime, setTravelTime] = useState<number | null>(null);

  const handleAddCarNorth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 10) + 1;
    setTravelTime(generatedTravelTime);
    handleAddCar("NORTH", generatedTravelTime);
    fetchData();
  };

  const handleAddCarSouth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 10) + 1;
    setTravelTime(generatedTravelTime);
    handleAddCar("SOUTH", generatedTravelTime);
    fetchData();
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-[20vh] w-[100vw]">
        <div className="col-span-1 p-4">
          <h1>waitingNorthCars {waitingNorthCars.length}</h1>
          <h1>processedNorthCars {processedNorthCars.length}</h1>
          <button onClick={handleAddCarNorth}>Dodaj car NORTH</button>
        </div>
        <div className="col-span-1 p-4">
          <h1>processingCars {processingCars.length}</h1>
          {travelTime !== null ? (
            <h1>travelTime {travelTime}</h1>
          ) : (
            <h1>travelTime = 0</h1>
          )}
        </div>
        <div className="col-span-1 p-4">
          <h1>waitingSouthCars {waitingSouthCars.length}</h1>
          <h1>processedSouthCars {processedSouthCars.length}</h1>
          <button onClick={handleAddCarSouth}>Dodaj car SOUTH</button>
        </div>
      </div>
      <div className="relative h-[80vh] w-[100vw]">
        <ImageComponent
          imagePath={RedCar}
          position={{ top: 300, left: 0, rotation: 90 }}
          size={{ width: 100, height: 100 }}
          speed={5}
        />
      </div>
    </>
  );
};

export default Home;
