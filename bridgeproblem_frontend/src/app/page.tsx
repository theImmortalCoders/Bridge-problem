"use client";
import React, { useState } from "react";
import { useApiFetching } from "@/hooks/apiFetching";
import { useApiSending } from "@/hooks/apiSending";
import Image from "next/image";
import CarComponent from "@/components/CarComponent";

const Home: React.FC = () => {
  const {
    waitingSouthCars,
    waitingNorthCars,
    processingCars,
    processedSouthCars,
    processedNorthCars,
    fetchData,
    currentDirection,
    maxCars,
  } = useApiFetching();

  const { handleAddCar, setCarsAmount } = useApiSending();

  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [maxCarsAmount, setMaxCarsAmount] = useState<number>(2);

  const handleAddCarNorth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 10) + 1;
    setTravelTime(generatedTravelTime);
    handleAddCar("NORTH", generatedTravelTime);
    fetchData();
  };

  const handleAddCarSouth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 5) + 1;
    setTravelTime(generatedTravelTime);
    handleAddCar("SOUTH", generatedTravelTime);
    fetchData();
  };

  const handleIncreaseSetMaxCars = () => {
    setCarsAmount(maxCars + 1);
    setMaxCarsAmount(maxCars + 1);
  };

  const handleDecreaseSetMaxCars = () => {
    setCarsAmount(maxCars - 1);
    setMaxCarsAmount(maxCars - 1);
  };

  //console.log("processedSouthCars", processedSouthCars);
  console.log("processedNorthCars", processedNorthCars);
  return (
    <div className="min-h-[100vh] min-w-[100vw]">
      <div className="grid grid-cols-3 gap-4 w-[100vw]">
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
          current direction:
          {currentDirection}
          max cars amount:
          {maxCarsAmount}
          <button onClick={handleIncreaseSetMaxCars}>
            Zwiększ max. liczbę aut z jednej strony naraz
          </button>
          <button onClick={handleDecreaseSetMaxCars}>
            Zmniejsz max. liczbę aut z jednej strony naraz
          </button>
        </div>
        <div className="col-span-1 p-4">
          <h1>waitingSouthCars {waitingSouthCars.length}</h1>
          <h1>processedSouthCars {processedSouthCars.length}</h1>
          <button onClick={handleAddCarSouth}>Dodaj car SOUTH</button>
        </div>
      </div>

      {/* TUTAJ JEST JEZDNIA */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="grid grid-cols-[38.5vw,20vw,38.5vw] gap-4 w-[100vw] justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-yellow-300 h-[10vh] w-full mb-4 flex flex-row items-center justify-start">
              {processedSouthCars.slice(-5).map((car, index) => (
                <CarComponent
                  key={index}
                  index={index}
                  source={car.source}
                  processingTime={car.processingTime}
                />
              ))}
            </div>
            <div className="bg-yellow-300 h-[10vh] w-full flex flex-row items-center justify-end">
              {waitingNorthCars.slice(0, 5).map((car, index) => (
                <CarComponent
                  key={index}
                  index={index}
                  source={car.source}
                  processingTime={car.processingTime}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-yellow-300 flex items-center justify-center h-[10vh] w-full">
              {processingCars.slice(-5).map((car, index) => (
                <CarComponent
                  key={index}
                  index={index}
                  source={car.source}
                  processingTime={car.processingTime}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-300 h-[10vh] w-full mb-4 flex flex-row-reverse items-center justify-start">
              {processedNorthCars.slice(-5).map((car, index) => (
                <CarComponent
                  key={index}
                  index={index}
                  source={car.source}
                  processingTime={car.processingTime}
                />
              ))}
            </div>
            <div className="bg-yellow-300 h-[10vh] w-full flex flex-row items-center justify-start">
              {waitingSouthCars.slice(0, 5).map((car, index) => (
                <CarComponent
                  key={index}
                  index={index}
                  source={car.source}
                  processingTime={car.processingTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
