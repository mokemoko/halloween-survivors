interface ResetButtonParams {
  scene: Phaser.Scene
  x: number
  y: number
}

export class ResetButton extends Phaser.GameObjects.Text {
  constructor({ scene, x, y }: ResetButtonParams) {
    const config = {
      fontFamily: 'Connection',
      fontSize: '40px',
      fill: '#fff',
      strokeThickness: 5,
      stroke: '#000',
    }
    super(scene, x, y, 'PRESS SPACE TO RESTART', config)

    this.setOrigin(0.5)

    scene.input.keyboard.addKey('SPACE').once('down', () => {
      scene.scene.start('GameScene')
    })
  }
}
