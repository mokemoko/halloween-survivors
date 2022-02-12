export class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'MainMenuScene',
    })
  }

  create(): void {
    this.add.image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      'top',
    ).setScale(0.6)

    this.add.bitmapText(
      this.sys.canvas.width / 2,
      100,
      'dotFont',
      'HALLOWEEN SURVIVORS',
      40,
    ).setOrigin(0.5)

    this.add.sprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      'player',
    ).setScale(2)

    this.add.bitmapText(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 100,
      'dotFont',
      'PRESS SPACE TO PLAY',
      30,
    ).setOrigin(0.5)

    this.input.keyboard.addKey('SPACE').once('down', () => {
      this.scene.start('GameScene')
    })
  }
}
