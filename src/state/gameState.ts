export interface GameState {
  friendship: number;
  choices: string[];
  easterEggsFound: string[];
  ending: string;
}

export const defaultGameState: GameState = {
  friendship: 0,
  choices: [],
  easterEggsFound: [],
  ending: ''
};
