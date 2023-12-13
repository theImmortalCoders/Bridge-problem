interface CarRequest {
  name: string;
  source: string;
  processingTime: number;
  travelTime?: number;
}

export const useApiSending = () => {
  const handleAddCar = async (source: string, travelTime: number) => {
    const newCar: CarRequest = {
      name: "car",
      source: source,
      processingTime: travelTime * 1000,
    };

    try {
      await fetch("http://localhost:8080/api/add-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const setCarsAmount = async (amount: number) => {
    console.log(amount);
    try {
      await fetch("http://localhost:8080/api/max-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(amount),
      });
    } catch (error) {
      console.error("Error setting cars amount:", error);
    }
  };

  return {
    handleAddCar,
    setCarsAmount,
  };
};
