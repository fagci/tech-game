export function pointDirection(anchor: PIXI.IPoint, point: PIXI.IPoint) {
  return Math.atan2(anchor.y - point.y, anchor.x - point.x) + Math.PI
}

export function directionVector(anchor: PIXI.IPoint, direction: number, multiplier: number = 1.0) {
  return {
    x: anchor.x + Math.cos(direction) * multiplier,
    y: anchor.y + Math.sin(direction) * multiplier,
  }
}

export function limit(value: number, max: number) {
  return value > max ? max : value
}

export function limitVector(vector: PIXI.IPoint, maxSize: number) {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  if (length < maxSize) return vector
  const divider = length / maxSize
  vector.x /= divider
  vector.y /= divider
  return vector
}

export function distance(from: PIXI.IPoint, to: PIXI.IPoint) {
  return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
}

export function boxIntersects(b1: PIXI.Rectangle, b2: PIXI.Rectangle) {
  return b1.x + b1.width > b2.x && b1.x < b2.x + b2.width && b1.y + b1.height > b2.y && b1.y < b2.y + b2.height
}

export function cellToPoint(i: number, j: number, cellSize: number = 16) {
  return new PIXI.Point(i * cellSize, j * cellSize)
}

export function pointToCell(point: PIXI.IPoint, cellSize: number = 16) {
  return {i: (point.x / cellSize) | 0, j: (point.y / cellSize) | 0}
}