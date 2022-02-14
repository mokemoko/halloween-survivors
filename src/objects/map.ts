import { GameState } from '../state'
import { DEPTH } from '../constant'

const CHUNK_WIDTH = 2000

interface MapParams {
  scene: Phaser.Scene
  gameState: GameState
}

export class Map extends Phaser.GameObjects.Container {
  private readonly gameState: GameState
  private currentChunk: [number, number]
  private readonly chunks: Record<string, Phaser.GameObjects.Image>

  constructor({ scene, gameState }: MapParams) {
    super(scene)

    this.gameState = gameState
    this.currentChunk = [0, 0]
    this.chunks = {}

    this.loadChunks(this.currentChunk)
  }

  update() {
    const pos = this.calcPos()
    if (pos[0] !== this.currentChunk[0] || pos[1] !== this.currentChunk[1]) {
      this.loadChunks(pos)
      this.currentChunk = pos
    }
  }

  calcPos(): [number, number] {
    const [x, y] = this.gameState.position
    const posX = Math.floor(x / CHUNK_WIDTH + 0.5)
    const posY = Math.floor(y / CHUNK_WIDTH + 0.5)
    return [posX, posY]
  }

  loadChunks([x, y]: [number, number]) {
    Object.keys(this.chunks).forEach(k => {
      const [xx, yy] = k.split(',').map(v => parseInt(v))
      if (Math.max(Math.abs(y - yy), Math.abs(x - xx)) > 1) {
        this.chunks[k].destroy()
        delete this.chunks[k]
      }
    })
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        const k = [i, j].join(',')
        if (k in this.chunks) {
          continue
        }
        this.chunks[k] = this.loadChunk([i, j])
      }
    }
    console.log('chunk loaded', Object.keys(this.chunks))
  }

  loadChunk([x, y]: [number, number]): Phaser.GameObjects.Image {
    return this.scene.add
      .image(CHUNK_WIDTH * x, CHUNK_WIDTH * y, 'map')
      .setScale(2)
      .setDepth(DEPTH.MAP)
  }
}
