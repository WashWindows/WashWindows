import React from 'react';
import '../../style/Scoreboard.css';

interface ScoreboardProps {
    points: number;
    clicked: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ points, clicked }) => {
    const calculateAccuracy = (points: number, clicked: number) => {
        if (!clicked) return "0.00";
        return ((points / clicked) * 100).toFixed(2);
    };

    return (
        <div className='scoreboard'>
            <h3>分數: {points}</h3>
            <h3>點擊次數: {clicked}</h3>
            <h3>準確率: {calculateAccuracy(points, clicked)}%</h3>
        </div>
    );
};

export default Scoreboard;