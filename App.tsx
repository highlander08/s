import React, { useState } from 'react';
import { Mode } from './types';
import QuantumLeapMode from './components/QuantumLeapMode';
import QuizMode from './components/QuizMode';
import StarMode from './components/StarMode';
import { AtomIcon, QuizIcon, StarIcon, InfoIcon } from './components/icons';

const MODE_CONFIG = {
  [Mode.QuantumLeap]: {
    component: QuantumLeapMode,
    name: 'Salto Quântico',
    icon: AtomIcon,
    explanation: {
      title: "O que é um Salto Quântico?",
      text: "Um elétron absorve um fóton com energia específica para saltar para um nível de energia mais alto e instável. Após um curto período, ele 'decai' de volta ao seu estado fundamental estável, emitindo um novo fóton. A cor da luz depende do tamanho do salto de energia."
    }
  },
  [Mode.Quiz]: {
    component: QuizMode,
    name: 'Quiz Quântico',
    icon: QuizIcon,
    explanation: {
      title: "Teste seu Conhecimento",
      text: "A mecânica quântica pode ser contraintuitiva. Este quiz testa alguns dos conceitos fundamentais demonstrados nas simulações. Veja o quão bem você entende o mundo quântico!"
    }
  },
  [Mode.Star]: {
    component: StarMode,
    name: 'Simulação Estelar',
    icon: StarIcon,
    explanation: {
      title: "Luz & Energia",
      text: "Estrelas são reatores de fusão gigantes que emitem energia por todo o espectro eletromagnético. A cor de uma estrela está relacionada à sua temperatura e aos elementos que ela contém. Estrelas vermelhas são mais frias, enquanto estrelas azuis e ultravioletas são muito mais quentes."
    }
  }
};

const App = () => {
    const [currentMode, setCurrentMode] = useState<Mode>(Mode.QuantumLeap);

    const ActiveComponent = MODE_CONFIG[currentMode].component;
    const explanation = MODE_CONFIG[currentMode].explanation;

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-quantum-dark font-sans" style={{fontFamily: 'Inter, sans-serif'}}>
            <header className="absolute top-0 left-0 p-4 z-20">
                <h1 className="text-2xl font-bold tracking-wider text-white" style={{fontFamily: 'Orbitron, sans-serif'}}>
                  <span className="text-quantum-cyan">F</span>oto<span className="text-quantum-pink">Q</span>uantum
                </h1>
            </header>
            
            <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20 md:pt-4">
                <div className="w-full h-full max-w-2xl max-h-[600px] bg-quantum-dark/50 rounded-2xl shadow-lg relative">
                    <ActiveComponent />
                </div>
            </main>

            <aside className="w-full md:w-80 bg-quantum-purple/40 p-6 flex flex-col space-y-8">
                <div>
                    <h2 className="text-lg font-bold mb-4 border-b border-quantum-blue/30 pb-2">Selecionar Modo</h2>
                    <div className="space-y-3">
                        {Object.values(Mode).map((mode) => {
                            const config = MODE_CONFIG[mode];
                            const Icon = config.icon;
                            const isActive = currentMode === mode;
                            return (
                                <button
                                    key={mode}
                                    onClick={() => setCurrentMode(mode)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${isActive ? 'bg-quantum-blue/20 text-quantum-cyan shadow-md' : 'hover:bg-white/10'}`}
                                >
                                    <Icon className={`w-6 h-6 ${isActive ? 'text-quantum-cyan' : 'text-white/70'}`} />
                                    <span className="font-semibold">{config.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 bg-black/20 p-4 rounded-lg">
                    <h3 className="flex items-center space-x-2 text-md font-bold text-quantum-yellow mb-3">
                        <InfoIcon className="w-5 h-5" />
                        <span>{explanation.title}</span>
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                        {explanation.text}
                    </p>
                </div>
            </aside>
        </div>
    );
};

export default App;