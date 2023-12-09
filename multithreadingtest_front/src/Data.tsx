"use client"
import React from 'react';

interface Ship {
    id: number;
    state: string;
    processingTime: number;
}

interface ShipListProps {
    title: string;
    ships: any
}

const ShipList: React.FC<ShipListProps> = ({ title, ships }) => (
    <div>
        <h2>{title}</h2>
        {ships.length > 0 ? (
            <ul>
                {ships.map((ship: Ship) => (
                    <li key={ship.id}>
                        {`Ship ${ship.id}`}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No ships available</p>
        )}
    </div>
);

export default ShipList;
