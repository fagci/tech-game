import * as PIXI from 'pixi.js'
import Controls from '../controls'
import State from '../state'
import GameObject from '../game-object'
import GUI from '../gui'
import {InventoryItem} from '../inventory'

export default class TestState extends State {
    constructor(app) {
        super(app)
        this.controls = new Controls()
        this.camera = new PIXI.Container()
        this.map = new PIXI.Container()

        const bgG = new PIXI.Graphics()

        bgG.lineStyle(0)
        bgG.beginFill(0,0)
        bgG.drawRect(0,0,32,32)
        bgG.endFill()
        bgG.lineStyle(0, 0)
        bgG.beginFill(0x888888)
        bgG.drawRect(0,0,1,1)

        const bgMap = new PIXI.Graphics()
        bgMap.lineStyle(1, 0x888888, 1.0, 1.0)
        bgMap.beginFill(0x002233)
        bgMap.drawRect(1,1,1023,1023)
        bgMap.endFill()


        const bgT = this.app.renderer.generateTexture(bgG)
        const bgGrid = new PIXI.TilingSprite(bgT, 1024, 1024)

        this.laserLayer = new PIXI.Graphics()

        this.addChild(this.map)
        this.map.addChild(bgMap)
        this.map.addChild(bgGrid)
        this.map.addChild(this.laserLayer)

        this.updateCamera()

        this.interactive = true
        this.on('click', e => {
            console.log('From test:', e.type, e.target)
        })

        const go1 = new GameObject()
        go1.position.set(128, 128)
        this.map.addChild(go1)

        const go2 = new GameObject()
        go2.position.set(256, 64)
        this.map.addChild(go2)

        const invItem = new InventoryItem()
        const gui = new GUI(app)

        gui.inventory.addItem(invItem)
        this.app.stage.addChild(gui)


        this.drone = new Drone()
        this.drone.position.set(100,100)
        this.map.addChild(this.drone)

        window.addEventListener('resize', () => {
            gui.resize()
            this.updateCamera()
        })
        window.addEventListener('drag', e => {
            if (e.dx !== 0 || e.dy !== 0)
                this.moveCamera(-e.dx, -e.dy)
        })
    }

    update = (time) => {
        let dx = 0,
            dy = 0
        if (this.controls.getKeyDown([38, 87])) dy -= time
        if (this.controls.getKeyDown([40, 83])) dy += time
        if (this.controls.getKeyDown([37, 65])) dx -= time
        if (this.controls.getKeyDown([39, 68])) dx += time

        if (dx !== 0 || dy !== 0) {
            const div = Math.sqrt(dx * dx + dy * dy) / 10.0
            this.moveCamera(dx / div, dy / div)
        }

        this.map.children.forEach(c => c.update && c.update(time))
    }

    updateCamera() {
        const RW2 = this.app.renderer.width / 2
        const RH2 = this.app.renderer.height / 2
        this.position.set(RW2, RH2)
    }

    setCameraPosition(x, y) {
        this.camera.position.set(x, y)
        this.map.pivot.copyFrom(this.camera.position)
    }

    moveCamera(dx, dy) {
        let { x, y } = this.camera.position

        x += dx
        y += dy

        if (x < 0) x = 0.0
        if (y < 0) y = 0.0
        if (x > this.map.width) x = this.map.width
        if (y > this.map.height) y = this.map.height

        this.setCameraPosition(x, y)
    }
}

class Drone extends PIXI.Sprite {
  constructor() {
    super()

    const g =new PIXI.Graphics()
    g.lineStyle(2,0x00ff00);
    g.moveTo(0,0)
    g.lineTo(30,15)
    g.lineTo(0,30)
    this.addChild(g)

    this.anchor.set(0.5)
  }
}