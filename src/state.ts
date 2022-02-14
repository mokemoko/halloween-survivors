export interface GameState {
  isDead: boolean
  duration: number
  position: [number, number]
  exp: number
  skills: []
}

export const defaultGameState = (): GameState => ({
  isDead: false,
  duration: 0,
  position: [0, 0],
  exp: 0,
  skills: [],
})

