import React, { useState, useEffect, useRef, useCallback } from "react";
import { PhotonColor } from "../types";

const PHOTON_COLORS: PhotonColor[] = [
  { name: "Red", tailwindColor: "bg-red-500", hex: "#ef4444", energy: 0 },
  { name: "Yellow", tailwindColor: "bg-yellow-400", hex: "#facc15", energy: 1 },
  { name: "Green", tailwindColor: "bg-green-400", hex: "#4ade80", energy: 2 },
  { name: "Blue", tailwindColor: "bg-blue-400", hex: "#60a5fa", energy: 3 },
];

const SIMULATION_WIDTH = 300;
const SIMULATION_HEIGHT = 300;
const CENTER_X = SIMULATION_WIDTH / 2;
const CENTER_Y = SIMULATION_HEIGHT / 2;
const DECAY_DELAY = 10000; // Increased decay time to 10 seconds

// This component is defined outside the main component to prevent re-creation on every render.
const ControlButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, className, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-quantum-purple ${className}`}
  >
    {children}
  </button>
);

const QuantumLeapMode = () => {
  const [atomLevel, setAtomLevel] = useState(1);
  const [photonColorIndex, setPhotonColorIndex] = useState(0);
  const [isPhotonMoving, setIsPhotonMoving] = useState(false);
  const [photonY, setPhotonY] = useState(SIMULATION_HEIGHT - 20);
  const [electronAngle, setElectronAngle] = useState(0);
  const [isDecayPhotonMoving, setIsDecayPhotonMoving] = useState(false);
  const [decayPhotonX, setDecayPhotonX] = useState(CENTER_X);
  const [absorptionCount, setAbsorptionCount] = useState(0);
  const [electronSpeed, setElectronSpeed] = useState(0.02);

  const lastAbsorptionTime = useRef<number | null>(null);
  const animationFrameId = useRef<number>();

  const handleShootPhoton = () => {
    if (!isPhotonMoving) {
      setPhotonY(SIMULATION_HEIGHT - 20);
      setIsPhotonMoving(true);
    }
  };

  const handleChangePhoton = () => {
    setPhotonColorIndex((prev) => (prev + 1) % PHOTON_COLORS.length);
  };

  const increaseSpeed = () => setElectronSpeed((s) => Math.min(0.1, s + 0.01));
  const decreaseSpeed = () => setElectronSpeed((s) => Math.max(0.01, s - 0.01));

  const animate = useCallback(() => {
    // Electron orbit
    setElectronAngle((angle) => angle + electronSpeed);

    // Photon movement and collision
    if (isPhotonMoving) {
      setPhotonY((y) => {
        const newY = y - 3;
        if (newY < 0) {
          setIsPhotonMoving(false);
          return SIMULATION_HEIGHT - 20;
        }

        const electronRadius = atomLevel * 25 + 20;
        const electronX = CENTER_X + electronRadius * Math.cos(electronAngle);
        const electronY = CENTER_Y + electronRadius * Math.sin(electronAngle);

        const distance = Math.sqrt(
          Math.pow(CENTER_X - electronX, 2) + Math.pow(newY - electronY, 2)
        );

        if (distance < 10) {
          // Collision detected
          setIsPhotonMoving(false);
          const photonEnergy = PHOTON_COLORS[photonColorIndex].energy;
          if (photonEnergy > 0 && atomLevel + photonEnergy <= 4) {
            setAtomLevel((prev) => prev + photonEnergy);
            setAbsorptionCount((c) => c + 1);
            lastAbsorptionTime.current = Date.now();
          }
          return SIMULATION_HEIGHT - 20;
        }
        return newY;
      });
    }

    // Decay check
    if (
      atomLevel > 1 &&
      lastAbsorptionTime.current &&
      Date.now() - lastAbsorptionTime.current > DECAY_DELAY
    ) {
      setAtomLevel(1);
      setIsDecayPhotonMoving(true);
      setDecayPhotonX(CENTER_X);
      lastAbsorptionTime.current = null;
    }

    // Decay photon movement
    if (isDecayPhotonMoving) {
      setDecayPhotonX((x) => {
        const newX = x + 3;
        if (newX > SIMULATION_WIDTH) {
          setIsDecayPhotonMoving(false);
        }
        return newX;
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [
    isPhotonMoving,
    atomLevel,
    electronAngle,
    photonColorIndex,
    isDecayPhotonMoving,
    electronSpeed,
  ]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  const electronRadius = atomLevel * 25 + 20;
  const electronX = CENTER_X + electronRadius * Math.cos(electronAngle);
  const electronY = CENTER_Y + electronRadius * Math.sin(electronAngle);
  const currentPhoton = PHOTON_COLORS[photonColorIndex];

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <h2
        className="text-xl font-bold mb-2 uppercase tracking-widest"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        Salto Quântico
      </h2>
      <div className="relative w-[300px] h-[300px] bg-quantum-purple rounded-xl border-2 border-quantum-blue/30 shadow-2xl shadow-quantum-blue/20">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Nucleus */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="8"
            fill="url(#nucleusGradient)"
          />
          <defs>
            <radialGradient id="nucleusGradient">
              <stop offset="0%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#7209b7" />
            </radialGradient>
          </defs>

          {/* Energy Levels */}
          {[1, 2, 3, 4].map((level) => (
            <circle
              key={level}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={level * 25 + 20}
              fill="none"
              stroke="rgba(0, 187, 249, 0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Electron */}
          <circle
            cx={electronX}
            cy={electronY}
            r="5"
            fill="#00f5d4"
            className="animate-glow"
          />

          {/* Incoming Photon */}
          {isPhotonMoving && (
            <circle cx={CENTER_X} cy={photonY} r="6" fill={currentPhoton.hex} />
          )}

          {/* Decay Photon */}
          {isDecayPhotonMoving && (
            <circle cx={decayPhotonX} cy={CENTER_Y} r="6" fill="white" />
          )}
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-4 text-center text-sm">
        <p>
          Absorções:{" "}
          <span className="font-bold text-quantum-yellow">
            {absorptionCount}
          </span>
        </p>
        <p>
          Nível de Energia:{" "}
          <span className="font-bold text-quantum-cyan">{atomLevel}</span>
        </p>
      </div>
      <div className="flex items-center space-x-2 mt-3">
        <span className="text-sm">Velocidade do Elétron:</span>
        <button
          onClick={decreaseSpeed}
          className="w-6 h-6 bg-quantum-pink rounded-full text-white font-bold"
        >
          -
        </button>
        <span className="font-mono text-quantum-yellow w-8 text-center">
          {Math.round(electronSpeed * 100)}
        </span>
        <button
          onClick={increaseSpeed}
          className="w-6 h-6 bg-quantum-pink rounded-full text-white font-bold"
        >
          +
        </button>
      </div>
      <div className="flex space-x-4 mt-3">
        <ControlButton
          onClick={handleChangePhoton}
          className="bg-gray-700 text-white hover:bg-opacity-80"
        >
          <div className="flex items-center space-x-2">
            <span>Mudar Fóton</span>
            <div
              className={`w-4 h-4 rounded-full  ${currentPhoton.tailwindColor}`}
            ></div>
          </div>
        </ControlButton>
        <ControlButton
          onClick={handleShootPhoton}
          className="bg-quantum-cyan text-quantum-dark hover:bg-opacity-80 disabled:opacity-50"
          disabled={isPhotonMoving}
        >
          Disparar Fóton
        </ControlButton>
      </div>
    </div>
  );
};

export default QuantumLeapMode;
