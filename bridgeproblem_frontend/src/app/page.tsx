"use client";
import React, { useEffect, useState } from "react";
import { useApiFetching } from "@/hooks/apiFetching";
import { useApiSending } from "@/hooks/apiSending";
import Image from "next/image";
import CarComponent from "@/components/CarComponent";
import Navbar from "@/components/Navbar";

const Home: React.FC = () => {
  useEffect(() => {
    setMaxCarsAmount(maxCars);
  });

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

  const [maxCarsAmount, setMaxCarsAmount] = useState<number | null>(null);

  const handleAddCarNorth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 6) + 4;
    handleAddCar("NORTH", generatedTravelTime);
    fetchData();
  };

  const handleAddCarSouth = () => {
    const generatedTravelTime = Math.floor(Math.random() * 6) + 4;
    handleAddCar("SOUTH", generatedTravelTime);
    fetchData();
  };

  const handleIncreaseSetMaxCars = () => {
    setCarsAmount(maxCars + 1);
    setMaxCarsAmount(maxCars + 1);
  };

  const handleDecreaseSetMaxCars = () => {
    if (maxCars > 1) {
      setCarsAmount(maxCars - 1);
      setMaxCarsAmount(maxCars - 1);
    }
  };
  const Height = "[30px]";
  return (
    <div className="h-[100vh] w-[100vw] bg-cyan-950">
      <Navbar />
      <div className="flex justify-center h-full w-full">
        <div className="w-[90%] h-[calc(90% * 9/16)]">
          <Image
            src="/bg.png"
            layout="fill"
            objectFit="contain"
            className="z-[0] pt-16 pb-2"
            alt={"bridge"}
          />
          <div
            className={`relative z-[2] w-[100%] h-[calc(100% * 9/16)] top-[10em]`}
          >
            <div className="flex justify-center w-[100%]">
              <div className="flex flex-col items-center w-[21.5vw]">
                <div
                  className={`bg-yellow-400 h-${Height} w-full mb-3 flex flex-row items-center justify-start`}
                >
                  {processedSouthCars.slice(-6).map((car, index) => (
                    <CarComponent
                      key={index}
                      index={index}
                      source={car.source}
                      processingTime={car.processingTime}
                    />
                  ))}
                </div>
                <div
                  className={`bg-yellow-400 h-${Height} w-full flex flex-row items-center justify-end`}
                >
                  {waitingNorthCars
                    .slice(0, 7)
                    .reverse()
                    .map((car, index) => (
                      <CarComponent
                        key={index}
                        index={index}
                        source={car.source}
                        processingTime={car.processingTime}
                      />
                    ))}
                </div>
              </div>
              <div className="flex-grow w-[44vw] px-8">
                <div className="flex items-center justify-center h-full w-full">
                  <div
                    className={`bg-yellow-400 flex items-center justify-center h-${Height} w-full`}
                  >
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
              </div>
              <div className="flex-grow w-[21.5vw]">
                <div className="flex flex-col items-center">
                  <div
                    className={`bg-yellow-400 h-${Height} w-full mb-3 flex flex-row-reverse items-center justify-end`}
                  >
                    {waitingSouthCars
                      .slice(0, 7)
                      .reverse()
                      .map((car, index) => (
                        <CarComponent
                          key={index}
                          index={index}
                          source={car.source}
                          processingTime={car.processingTime}
                        />
                      ))}
                  </div>
                  <div
                    className={`bg-yellow-400 h-${Height} w-full flex flex-row items-center justify-end`}
                  >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
