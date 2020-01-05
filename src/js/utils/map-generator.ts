// @ts-ignore
import {Noise} from 'noisejs'
import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'

export default class MapGenerator {
  noise: Noise

  constructor(seed: number) {
    this.noise = new Noise(seed)
  }

  static getChunkName(col: number, row: number) {
    return `Chunk_${col}_${row}`
  }

  static getBiome(v: number) {
    if (v < 0.12) return 'sand'
    else if (v < 0.22) return 'ground'
    else if (v < 0.5) return 'grass'
    else if (v < 0.85) return 'stone'
    else return 'snow'
  }

  getChunkSprite(col: number, row: number) {
    const tileRow = row << 5
    const tileCol = col << 5
    const x = tileCol << 4
    const y = tileRow << 4

    const nextChunkTileRow = (row + 1) << 5
    const nextChunkTileCol = (col + 1) << 5

    const bgT = new PIXI.Graphics()

    let tx = 0
    let ty = 0

    const textureTiles: any = {}
    const waterTiles: any = []

    for (let j = tileRow; j < nextChunkTileRow; j++) {
      tx = 0
      for (let i = tileCol; i < nextChunkTileCol; i++) {
        let heightValue = this.getHeightValue(i, j)
        const textureName = MapGenerator.getBiome(heightValue)
        if (textureTiles[textureName] === undefined) textureTiles[textureName] = []
        const tilePos = {x: tx, y: ty}
        textureTiles[textureName].push(tilePos)

        if (heightValue < 0.05) waterTiles.push(tilePos)
        tx += 16
      }
      ty += 16
    }

    for (let textureName in textureTiles) {
      if (!textureTiles.hasOwnProperty(textureName)) continue
      const texture = window.app.textures[textureName]
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
      texture.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON
      bgT.beginTextureFill({texture})
      textureTiles[textureName].forEach((c: { x: number; y: number }) => bgT.drawRect(c.x, c.y, 16, 16))
      bgT.endFill()
    }

    if (waterTiles.length > 0) {
      bgT.beginTextureFill({texture: window.app.textures.water})
      waterTiles.forEach((c: { x: number; y: number }) => bgT.drawRect(c.x, c.y, 16, 16))
    }

    const chunkSprite = bgT
    chunkSprite.position.set(x, y)
    chunkSprite.name = MapGenerator.getChunkName(col, row)
    return chunkSprite
  }

  loadChunksInView(viewport: Viewport, container: PIXI.Container) {
    const chunkColStart = (viewport.left >> 9) - 1
    const chunkRowStart = (viewport.top >> 9) - 1
    const chunkColEnd = (viewport.right >> 9) + 1
    const chunkRowEnd = (viewport.bottom >> 9) + 1

    const persistChunks: Array<string> = []

    for (let j = chunkRowStart; j < chunkRowEnd; j++) {
      for (let i = chunkColStart; i < chunkColEnd; i++) {
        const chunkName = MapGenerator.getChunkName(i, j)
        persistChunks.push(chunkName)
        if (container.getChildByName(chunkName)) continue
        container.addChild(this.getChunkSprite(i, j))
      }
    }
    container.children.forEach(children => {
      if (persistChunks.indexOf(children.name) === -1) container.removeChild(children)
    })
  }

  getHeightValue(i: number, j: number) {
    return 1.0 * this.noise.perlin2(i / 100, j / 100)
      + 0.75 * this.noise.perlin2(i / 50, j / 50)
      + 0.5 * this.noise.perlin2(i / 25, j / 25)
      + 0.25 * this.noise.perlin2(i / 12, j / 12)
  }
}