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
  return (
    <>
      <Image
        src="/bg.png"
        width="1080"
        height="1920"
        sizes="100vw"
        className="min-h-[100v] w-auto fixed center top-0 left-0 z-[-10]"
        alt={"bridge"}
      />
      <div className="min-h-[100vh] min-w-[100vw]">
        {/* TUTAJ JEST WATING */}
        <div className="relative top-[40vh]">
          <div className="flex w-[100vw] justify-between px-16">
            <div className="h-auto w-auto bg-white text-black rounded-lg p-2 text-[18px]">
              <h1>waitingNorthCars: {waitingNorthCars.length}</h1>
              <h1>processedNorthCars: {processedNorthCars.length}</h1>
            </div>
            <div className="h-auto w-auto bg-white text-black rounded-lg p-2 text-[18px]">
              <h1>waitingSouthCars: {waitingSouthCars.length}</h1>
              <h1>processedSouthCars: {processedSouthCars.length}</h1>
            </div>
          </div>
        </div>
        {/* TUTAJ JEST JEZDNIA */}
        <div className="grid grid-cols-3 gap-4 items-center absolute top-[61.5vh]">
          <div className="grid grid-cols-[21.5vw,44vw,21.5vw] gap-28 w-[100vw] justify-center">
            <div className="flex flex-col items-center">
              <div className=" h-[5vh] w-full mb-3 flex flex-row items-center justify-start">
                {processedSouthCars.slice(-6).map((car, index) => (
                  <CarComponent
                    key={index}
                    index={index}
                    source={car.source}
                    processingTime={car.processingTime}
                  />
                ))}
              </div>
              <div className=" h-[5vh] w-full flex flex-row items-center justify-end">
                {waitingNorthCars.slice(0, 7).map((car, index) => (
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
              <div className=" flex items-center justify-center h-[5vh] w-full">
                {processingCars.slice(-6).map((car, index) => (
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
              <div className="h-[5vh] w-full mb-3 flex flex-row-reverse items-center justify-end">
                {waitingSouthCars.slice(0, 7).map((car, index) => (
                  <CarComponent
                    key={index}
                    index={index}
                    source={car.source}
                    processingTime={car.processingTime}
                  />
                ))}
              </div>
              <div className=" h-[5vh] w-full flex flex-row items-center justify-end">
                {processedNorthCars.slice(-6).map((car, index) => (
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
        {/* TUTAJ SA SWIATŁA */}
        <div className="absolute top-[73vh] left-[20vw]">
          <div
            className={`h-[30px] w-[30px] rounded-full ${
              currentDirection === '"NORTH"' ? "bg-green-600" : "bg-red-600"
            }`}
          ></div>
        </div>
        <div className="absolute top-[57.5vh] right-[22vw]">
          <div
            className={`h-[30px] w-[30px] rounded-full ${
              currentDirection === '"SOUTH"' ? "bg-green-600" : "bg-red-600"
            }`}
          ></div>
        </div>
        {/* TUTAJ JEST BUTTON */}
        <div className="relative top-[71vh]">
          <div className="flex w-[100vw] justify-between px-16">
            <div className="h-auto w-auto bg-slate-600 rounded-lg p-2 text-[18px]">
              <button onClick={handleAddCarNorth}>Dodaj car NORTH</button>
            </div>
            <div className="h-auto w-auto bg-slate-600 rounded-lg p-2 text-[18px]">
              <button onClick={handleAddCarSouth}>Dodaj car SOUTH</button>
            </div>
          </div>
        </div>
        {/* TUTAJ JEST +- */}
        <div className="relative top-[71vh]">
          <div className="flex w-[100vw] justify-center px-16 gap-8">
            <button
              className="h-auto w-auto bg-slate-600 rounded-lg p-2 text-[18px]"
              onClick={handleDecreaseSetMaxCars}
            >
              -1
            </button>
            <h1 className="h-auto w-auto bg-slate-600 rounded-lg p-2 text-[18px]">
              max cars amount: {maxCarsAmount}
            </h1>
            <button
              className="h-auto w-auto bg-slate-600 rounded-lg p-2 text-[18px]"
              onClick={handleIncreaseSetMaxCars}
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
