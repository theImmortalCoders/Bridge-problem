"use client"
import { useEffect, useState } from 'react';
import ShipList from '@/Data';

interface Ship {
    id: string;
    state: string;
    processingTime: number;
}
const Home: React.FC = () => {
    const [ships, setShips] = useState<Ship[]>([]);
    const [waitingShips, setWaitingShips] = useState<Ship[]>([]);
    const [processingShips, setProcessingShips] = useState<Ship[]>([]);
    const [processedShips, setProcessedShips] = useState<Ship[]>([]);

    const fetchData = async () => {
        try {
            const shipsResponse = await fetch('http://localhost:8080/api/ships');
            const shipsData = await shipsResponse.json();
            setShips(shipsData);

            // Podziel statki na kategorie
            const waiting = shipsData.filter((ship: { state: string; }) => ship.state === 'WAITING');
            const processing = shipsData.filter((ship: { state: string; }) => ship.state === 'PROCESSING');
            const processed = shipsData.filter((ship: { state: string; }) => ship.state === 'PROCESSED');

            setWaitingShips(waiting);
            setProcessingShips(processing);
            setProcessedShips(processed);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    const generateShips = async () => {
        try {
            await fetch('http://localhost:8080/api/generate-ships', { method: 'GET' });
            fetchData();
        } catch (error) {
            console.error('Error generating ships:', error);
        }
    };

    return (
        <div>
            <h1>Ship Processing App</h1>
            <button onClick={generateShips}>Generate Ship</button>
            <ShipList title="Waiting Ships" ships={waitingShips} />
            <ShipList title="Processing Ships" ships={processingShips} />
            <ShipList title="Processed Ships" ships={processedShips} />
        </div>
    );
};

export default Home;
