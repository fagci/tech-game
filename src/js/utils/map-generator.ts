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

    const chunkGraphics = new PIXI.Graphics()
    chunkGraphics.position.set(x, y)
    chunkGraphics.name = MapGenerator.getChunkName(col, row)

    let tx = 0
    let ty = 0

    const textureTiles: any = {}
    const waterTiles: any = []
    let i, j, heightValue, textureName, tilePos

    for (j = tileRow; j < nextChunkTileRow; j++) {
      tx = 0
      for (i = tileCol; i < nextChunkTileCol; i++) {
        heightValue = this.getHeightValue(i, j)
        textureName = MapGenerator.getBiome(heightValue)

        if (textureTiles[textureName] === undefined) textureTiles[textureName] = []
        tilePos = {x: tx, y: ty}
        textureTiles[textureName].push(tilePos)

        if (heightValue < 0.05) waterTiles.push(tilePos)
        tx += 16
      }
      ty += 16
    }

    let texture

    for (textureName in textureTiles) {
      if (!textureTiles.hasOwnProperty(textureName)) continue
      texture = window.app.textures[textureName]
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
      chunkGraphics.beginTextureFill({texture})
      textureTiles[textureName].forEach((c: { x: number; y: number }) => chunkGraphics.drawRect(c.x, c.y, 16, 16))
      chunkGraphics.endFill()
    }

    if (waterTiles.length > 0) {
      chunkGraphics.beginTextureFill({texture: window.app.textures.water})
      waterTiles.forEach((c: { x: number; y: number }) => chunkGraphics.drawRect(c.x, c.y, 16, 16))
    }

    return chunkGraphics
  }

  loadChunksInView(viewport: Viewport, container: PIXI.Container) {
    const chunkColStart = (viewport.left >> 9) - 1
    const chunkRowStart = (viewport.top >> 9) - 1
    const chunkColEnd = (viewport.right >> 9) + 1
    const chunkRowEnd = (viewport.bottom >> 9) + 1

    const persistChunks: Array<string> = []

    let i, j

    for (j = chunkRowStart; j < chunkRowEnd; j++) {
      for (i = chunkColStart; i < chunkColEnd; i++) {
        const chunkName = MapGenerator.getChunkName(i, j)
        persistChunks.push(chunkName)
        if (container.getChildByName(chunkName)) continue
        container.addChild(this.getChunkSprite(i, j))
      }
    }
    container.children.forEach(children => {
      if (persistChunks.indexOf(children.name) === -1) {
        children.destroy()
        // container.removeChild(children)
      }
    })
  }

  getHeightValue(i: number, j: number) {
    return 1.0 * this.noise.perlin2(i / 100, j / 100)
      + 0.75 * this.noise.perlin2(i / 50, j / 50)
      + 0.5 * this.noise.perlin2(i / 25, j / 25)
      + 0.25 * this.noise.perlin2(i / 12, j / 12)
  }
}