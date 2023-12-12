interface CarRequest {
  name: string;
  source: string;
  processingTime: number;
}

export const useApiSending = () => {
  const handleAddCar = async (source: string) => {
    const newCar: CarRequest = {
      name: "car",
      source: source,
      processingTime: 10000,
    };

    try {
      console.log("Sending data:", JSON.stringify(newCar));

      await fetch("http://localhost:8080/api", {
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

  return {
    handleAddCar,
  };
};
