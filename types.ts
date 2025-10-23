
export enum Mode {
  QuantumLeap = 'QUANTUM_LEAP',
  Quiz = 'QUIZ',
  Star = 'STAR',
}

export interface Question {
  question: string;
  answer: string;
}

export interface PhotonColor {
  name: string;
  tailwindColor: string;
  hex: string;
  energy: number;
}
