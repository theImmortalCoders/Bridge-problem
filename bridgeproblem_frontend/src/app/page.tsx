"use client";
import React, { useState, useEffect } from "react";
import ImageComponent from "@/components/ImageComponent";
import RedCar from "@/assets/redCar.png";

interface Car {
  name: string;
  state: string;
  source: string;
  processingTime: number;
  position: number;
}

const Home: React.FC = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [waitingSouthCars, setWaitingSouthCars] = useState<Car[]>([]);
  const [waitingNorthCars, setWaitingNorthCars] = useState<Car[]>([]);
  const [processingCars, setProcessingCars] = useState<Car[]>([]);
  const [processedSouthCars, setProcessedSouthCars] = useState<Car[]>([]);
  const [processedNorthCars, setProcessedNorthCars] = useState<Car[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api");
      const carData = await response.json();
      setCarData(carData);

      const waitingSouthCars = carData.filter(
        (car: Car) => car.state === "WAITING" && car.source === "SOUTH"
      );

      const waitingNorthCars = carData.filter(
        (car: Car) => car.state === "WAITING" && car.source === "NORTH"
      );
      const processingCars = carData.filter(
        (car: Car) => car.state === "PROCESSING"
      );

      const processedSouthCars = carData.filter(
        (car: Car) => car.state === "PROCESSED" && car.source === "SOUTH"
      );
      const processedNorthCars = carData.filter(
        (car: Car) => car.state === "PROCESSED" && car.source === "NORTH"
      );

      setWaitingSouthCars(waitingSouthCars);
      setWaitingNorthCars(waitingNorthCars);
      setProcessingCars(processingCars);
      setProcessedSouthCars(processedSouthCars);
      setProcessedNorthCars(processedNorthCars);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddCar = async (source: string) => {
    const newCar: Car = {
      name: "car",
      state: "WAITING",
      source: source,
      processingTime: 1000,
      position: 0,
    };

    try {
      await fetch("http://localhost:8080/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      // Update the local state after successful API request
      fetchData();
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleAddCarNorth = () => {
    handleAddCar("NORTH");
  };

  const handleAddCarSouth = () => {
    handleAddCar("SOUTH");
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
