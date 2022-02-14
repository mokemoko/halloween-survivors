export interface GameState {
  duration: number
  position: [number, number]
  exp: number
  skills: []
}

export const defaultGameState: GameState = {
  duration: 0,
  position: [0, 0],
  exp: 0,
  skills: [],
}

