import React, { useState, useEffect } from 'react';
import { StarIcon } from './icons';

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute rounded-full bg-white animate-twinkle" style={style} />
);

const StarMode = () => {
    const [ledUVActive, setLedUVActive] = useState(false);
    const [stars, setStars] = useState<React.CSSProperties[]>([]);
    const [isStarShining, setIsStarShining] = useState(false);
    const [isSequenceRunning, setIsSequenceRunning] = useState(false);

    useEffect(() => {
        const generatedStars = Array.from({ length: 50 }).map(() => {
            const size = Math.random() * 2 + 1;
            return {
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
            };
        });
        setStars(generatedStars);
    }, []);
    
    const activateUVAndStarSequence = () => {
        if (isSequenceRunning) return;

        setIsSequenceRunning(true);
        setLedUVActive(true);
        
        // After 9 seconds...
        setTimeout(() => {
            setLedUVActive(false); // Deactivate UV glow
            setIsStarShining(true); // Make the star shine

            // After 7 more seconds...
            setTimeout(() => {
                setIsStarShining(false); // Turn off the star shine
                setIsSequenceRunning(false); // End of sequence
            }, 7000); // 7 seconds shine duration
        }, 9000); // 9 seconds UV effect duration
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full text-center">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-widest" style={{fontFamily: 'Orbitron, sans-serif'}}>Modo Estrela</h2>
            <div className="relative w-full max-w-md h-64 bg-quantum-purple rounded-xl border-2 border-quantum-blue/30 shadow-2xl shadow-quantum-blue/20 overflow-hidden">
                {/* Background stars */}
                {stars.map((style, i) => <Star key={i} style={style} />)}
                
                {/* UV Glow Effect */}
                {ledUVActive && <div className="absolute inset-0 w-full h-full animate-led-glow-uv"></div>}

                {/* Main Star - rendered last to be on top */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <StarIcon 
                        className={`w-24 h-24 transition-all duration-700 ${isStarShining ? 'text-quantum-yellow animate-star-shine' : 'text-gray-700'}`} 
                        fill={isStarShining ? 'currentColor' : 'none'}
                    />
                </div>
            </div>
            <div className="mt-4 text-white/80">
                <p>Ative a luz UV para energizar a estrela e vê-la brilhar.</p>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={activateUVAndStarSequence}
                    disabled={isSequenceRunning}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Ativar Luz UV
                </button>
            </div>
        </div>
    );
};

export default StarMode;