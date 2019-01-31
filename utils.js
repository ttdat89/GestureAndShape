
export function random(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export function randomColor() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
}

export const TAP_DELAY = 200