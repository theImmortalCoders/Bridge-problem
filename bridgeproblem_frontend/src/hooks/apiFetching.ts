import { useState, useEffect } from "react";

interface Car {
  name: string;
  state: string;
  source: string;
  processingTime: number;
}

export const useApiFetching = () => {
  const [carData, setCarData] = useState<Car[]>([]);
  const [waitingSouthCars, setWaitingSouthCars] = useState<Car[]>([]);
  const [waitingNorthCars, setWaitingNorthCars] = useState<Car[]>([]);
  const [processingCars, setProcessingCars] = useState<Car[]>([]);
  const [processedSouthCars, setProcessedSouthCars] = useState<Car[]>([]);
  const [processedNorthCars, setProcessedNorthCars] = useState<Car[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/get-cars");
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

  return {
    carData,
    waitingSouthCars,
    waitingNorthCars,
    processingCars,
    processedSouthCars,
    processedNorthCars,
    fetchData,
  };
};
