export function pointDirection(anchor, point) {
  return Math.atan2(anchor.y - point.y, anchor.x - point.x) + Math.PI
}