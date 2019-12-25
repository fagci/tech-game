export function pointDirection(anchor, point) {
  return Math.atan2(anchor.y - point.y, anchor.x - point.x) + Math.PI
}

export function limit(value, max) {
  return value > max ? max : value
}

export function limitVector(vector, maxSize) {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
  if (length < maxSize) return vector
  const divider = length / maxSize
  vector.x /= divider
  vector.y /= divider
  return vector
}