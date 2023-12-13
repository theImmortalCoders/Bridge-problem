"use client";
import React, { useState } from "react";
import { useApiFetching } from "@/hooks/apiFetching";
import { useApiSending } from "@/hooks/apiSending";
import Image from "next/image";

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
    //const generatedTravelTime = Math.floor(Math.random() * 10) + 1;
    const generatedTravelTime = 4;
    setTravelTime(generatedTravelTime);
    handleAddCar("NORTH", generatedTravelTime);
    fetchData();
  };

  const handleAddCarSouth = () => {
    //const generatedTravelTime = Math.floor(Math.random() * 5) + 1;
    const generatedTravelTime = 4;
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
      <div className="grid grid-cols-[40vw,20vw,40vw] gap-4 h-[20vh] w-[100vw] justify-center">
        <div className="bg-orange-800 flex flex-row-reverse items-center">
          {waitingNorthCars.map((car, index) => (
            <p
              key={index}
              className="rotate-90 flex flex-col justify-center items-center"
            >
              {`Travel Time: ${car.processingTime}`}
              <Image src={"/redCar.png"} alt={""} width={100} height={100} />
            </p>
          ))}
        </div>
        <div className="bg-orange-800 flex flex-row items-center justify-center">
          {processingCars.map((car, index) => (
            <p
              key={index}
              className={`${
                car.source === "NORTH" ? "" : "-"
              }rotate-90 flex flex-col justify-center items-center`}
            >
              {`Travel Time: ${car.processingTime}`}
              <Image
                src={`/${car.source === "NORTH" ? "red" : "blue"}Car.png`}
                alt={""}
                width={100}
                height={100}
              />
            </p>
          ))}
        </div>
        <div className="bg-orange-800 flex flex-row items-center">
          {waitingSouthCars.map((car, index) => (
            <p
              key={index}
              className="-rotate-90 flex flex-col justify-center items-center"
            >
              {`Travel Time: ${car.processingTime}`}
              <Image src={"/blueCar.png"} alt={""} width={100} height={100} />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
