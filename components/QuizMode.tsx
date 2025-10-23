import React, { useState, useCallback } from 'react';
import { questions } from '../data/questions';

const QuizMode = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const getNewQuestion = useCallback(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * questions.length);
        } while (newIndex === questionIndex);
        setQuestionIndex(newIndex);
        setShowAnswer(false);
    }, [questionIndex]);

    const toggleAnswer = () => {
        setShowAnswer(prev => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full text-center">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-widest" style={{fontFamily: 'Orbitron, sans-serif'}}>Quiz Quântico</h2>
            <div className="w-full max-w-md min-h-[200px] bg-quantum-purple p-6 rounded-xl border-2 border-quantum-blue/30 shadow-2xl shadow-quantum-blue/20">
                <p className="text-lg text-quantum-cyan mb-4 font-semibold">"{questions[questionIndex].question}"</p>
                {showAnswer && (
                    <div className="p-4 bg-quantum-dark/50 rounded-lg">
                        <p className="text-white/90">{questions[questionIndex].answer}</p>
                    </div>
                )}
            </div>
            <div className="flex space-x-4 mt-6">
                <button
                    onClick={getNewQuestion}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-quantum-pink text-white hover:bg-opacity-80 transition-all duration-200"
                >
                    Nova Pergunta
                </button>
                <button
                    onClick={toggleAnswer}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-quantum-cyan text-quantum-dark hover:bg-opacity-80 transition-all duration-200"
                >
                    {showAnswer ? 'Ocultar' : 'Mostrar'} Resposta
                </button>
            </div>
        </div>
    );
};

export default QuizMode;