"use client";
import React, { useState, useEffect } from "react";

interface Car {
  name: string;
  state: string;
  source: string;
  processingTime: number;
  position: number;
}

const Home: React.FC = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api");
        const data = await response.json();
        setCarData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const waitingSouthCars = carData.filter(
    (car) => car.state === "WAITING" && car.source === "SOUTH"
  );

  const waitingNorthCars = carData.filter(
    (car) => car.state === "WAITING" && car.source === "NORTH"
  );

  const processingCars = carData.filter((car) => car.state === "PROCESSING");

  const processedSouthCars = carData.filter(
    (car) => car.state === "PROCESSED" && car.source === "SOUTH"
  );

  const processedNorthCars = carData.filter(
    (car) => car.state === "PROCESSED" && car.source === "NORTH"
  );

  console.log("waitingSouthCars", waitingSouthCars);
  console.log("waitingNorthCars", waitingNorthCars);
  console.log("processingCars", processingCars);
  console.log("processedSouthCars", processedSouthCars);
  console.log("processedNorthCars", processedNorthCars);

  return (
    <div style={{ position: "relative", height: "400px", width: "600px" }}>
      <h1>O kurwa to działa</h1>
    </div>
  );
};

export default Home;
