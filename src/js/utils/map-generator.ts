// @ts-ignore
import {Noise} from 'noisejs'
import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'

export default class MapGenerator {
  private readonly noise: Noise 
  static readonly TILE_SIZE = 16
  static readonly TILE_SIZE_POWER = 4
  static readonly CHUNK_SIZE_POWER = 5
  static readonly CHUNK_SIZE_PX_POWER = MapGenerator.TILE_SIZE_POWER + MapGenerator.CHUNK_SIZE_POWER


  constructor(seed: number) {
    this.noise = new Noise(seed)
  }

  static getChunkName(col: number, row: number) {
    return `Chunk_${col}_${row}`
  }

  static getBiome(v: number) {
    if (v < 0.12) return 'sand'
    else if (v < 0.18) return 'ground'
    else if (v < 0.5) return 'grass'
    else if (v < 0.85) return 'stone'
    else return 'snow'
  }

  getChunkSprite(col: number, row: number) {
    const tileRow = row << MapGenerator.CHUNK_SIZE_POWER
    const tileCol = col << MapGenerator.CHUNK_SIZE_POWER

    const nextChunkTileRow = (row + 1) << MapGenerator.CHUNK_SIZE_POWER
    const nextChunkTileCol = (col + 1) << MapGenerator.CHUNK_SIZE_POWER

    const chunkGraphics = new PIXI.Graphics()
    chunkGraphics.cacheAsBitmap = true
    chunkGraphics.lineStyle(0, 0, 0, 0)
    chunkGraphics.position.set(tileCol << MapGenerator.TILE_SIZE_POWER, tileRow << MapGenerator.TILE_SIZE_POWER)
    chunkGraphics.name = MapGenerator.getChunkName(col, row)

    const textureTiles: any = {}
    const waterTiles: any = []

    let i, j, tx = 0, ty = 0, heightValue, textureName, tilePos

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
      chunkGraphics.beginTextureFill({texture})
      const tiles = textureTiles[textureName]
      for(const c of tiles) {
        chunkGraphics.drawRect(c.x, c.y, MapGenerator.TILE_SIZE, MapGenerator.TILE_SIZE)
      }
    }

    if (waterTiles.length > 0) {
      for(const c of waterTiles) {
        chunkGraphics.beginTextureFill({
          texture: window.app.textures.water_1,
        })
        chunkGraphics.drawRect(c.x, c.y, MapGenerator.TILE_SIZE, MapGenerator.TILE_SIZE)
      }
    }

    return chunkGraphics
  }

  loadChunksInView(viewport: Viewport, container: PIXI.Container) {
    const {left, top, right, bottom} = viewport
    const chunkColStart = (left >> MapGenerator.CHUNK_SIZE_PX_POWER) - 2
    const chunkRowStart = (top >> MapGenerator.CHUNK_SIZE_PX_POWER) - 2
    const chunkColEnd = (right >> MapGenerator.CHUNK_SIZE_PX_POWER) + 2
    const chunkRowEnd = (bottom >> MapGenerator.CHUNK_SIZE_PX_POWER) + 2

    const persistChunks: {[name: string]:boolean} = {}

    let i, j

    console.time('Generate chunks')
    for (j = chunkRowStart; j < chunkRowEnd; ++j) {
      for (i = chunkColStart; i < chunkColEnd; ++i) {
        const chunkName = MapGenerator.getChunkName(i, j)
        persistChunks[chunkName] = true
        if (container.getChildByName(chunkName)) continue
        container.addChild(this.getChunkSprite(i, j))
      }
    }
    console.timeEnd('Generate chunks')
    for(const children of container.children) {
      if (persistChunks[children.name]) continue
      children.destroy()
    }
  }

  getHeightValue(i: number, j: number) {
    return 1.0 * this.noise.perlin2(i / 100, j / 100)
      + 0.75 * this.noise.perlin2(i / 50, j / 50)
      + 0.5 * this.noise.perlin2(i / 25, j / 25)
      + 0.25 * this.noise.perlin2(i / 12, j / 12)
  }
}