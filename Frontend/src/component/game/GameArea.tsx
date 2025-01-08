import React, { useState, useEffect } from 'react';
import Window from "../../assets/window.png";
import Rag from "../../assets/rag.png";
import Dirty from "../../assets/dirty.png";
import wipeAudio from '../../assets/wipe.mp3';
import wrongAudio from '../../assets/wrong.mp3';

interface GameAreaProps {
    points: number;
    clicked: number;
    onScoreIncrease: () => void;
    onWrongAttempt: () => void;
    updateStatus?: string;
    isExiting?: boolean;
}

export const GameArea: React.FC<GameAreaProps> = ({
    points,
    clicked,
    onScoreIncrease,
    onWrongAttempt,
    updateStatus = "",
    isExiting = false
}) => {
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const [wrongAttempt, setWrongAttempt] = useState(false);
    const [position, setPosition] = useState({ top: 60, left: 50 });
    const [dirtyPosition, setDirtyPosition] = useState({ top: 50, left: 50 });
    const [dirtyVisible, setDirtyVisible] = useState<boolean>(true);

    const generateDirtyPosition = (key: string): { top: number, left: number } => {
        switch (key) {
            case "ArrowUp":
                return { top: 20, left: 48 };
            case "ArrowDown":
                return { top: 68, left: 48 };
            case "ArrowLeft":
                return { top: 42, left: 40 };
            case "ArrowRight":
                return { top: 42, left: 55 };
            default:
                return position;
        }
    };

    const generateRandomKey = () => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newPosition = generateDirtyPosition(randomKey);
        setDirtyVisible(false);

        setTimeout(() => {
            setDirtyPosition(newPosition);
            setDirtyVisible(true);
        }, 100);

        return randomKey;
    };

    const playSound = (src: string) => {
        const audio = new Audio(src);
        audio.play();
    };

    const updatePosition = (key: string) => {
        const step = 8;
        setPosition((prevPosition) => {
            switch (key) {
                case "ArrowUp":
                    return { ...prevPosition, top: Math.max(0, prevPosition.top - step - 10) };
                case "ArrowDown":
                    return { ...prevPosition, top: Math.min(95, prevPosition.top + step + 10) };
                case "ArrowLeft":
                    return { ...prevPosition, left: Math.max(0, prevPosition.left - step) };
                case "ArrowRight":
                    return { ...prevPosition, left: Math.min(95, prevPosition.left + step) };
                default:
                    return prevPosition;
            }
        });

        setTimeout(() => {
            setPosition({ top: 60, left: 50 });
        }, 200);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
            if (key === currentKey) {
                onScoreIncrease();
                setWrongAttempt(false);
                updatePosition(key);
                playSound(wipeAudio);
                setTimeout(() => {
                    setCurrentKey(generateRandomKey());
                }, 200)
            } else {
                playSound(wrongAudio);
                updatePosition(key);
                setWrongAttempt(true);
                onWrongAttempt();
            }
        }
    };

    useEffect(() => {
        setCurrentKey(generateRandomKey());
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentKey]);

    return (
        <div className="game-area">
            <img className="window" src={Window} alt="Window" />
            <div
                className="rag"
                style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                }}
            >
                <img className="rag" src={Rag} alt="rag" />
            </div>
            {dirtyVisible && (
                <div
                    className="dirty"
                    style={{
                        top: `${dirtyPosition.top}%`,
                        left: `${dirtyPosition.left}%`,
                    }}
                >
                    <img src={Dirty} alt="dirty" className="dirty-animation" />
                </div>
            )}
            <div className="controls">
                {["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].map((key) => (
                    <button
                        key={key}
                        className={`control-button ${key === currentKey ? 'current' : ''} ${wrongAttempt && key === currentKey ? 'wrong' : ''}`}
                    >
                        {key === "ArrowUp" && " ⭡"}
                        {key === "ArrowDown" && "⭣"}
                        {key === "ArrowLeft" && "⭠"}
                        {key === "ArrowRight" && "⭢"}
                    </button>
                ))}
            </div>
            {updateStatus && (
                <div
                    className={`update-status ${isExiting ? 'exit' : ''}`}
                    style={{
                        backgroundColor: updateStatus === "請先登入！" ? '#ff2222' : '#3498dbe6'
                    }}
                >
                    {updateStatus}
                </div>
            )}
        </div>
    );
};

export default GameArea;