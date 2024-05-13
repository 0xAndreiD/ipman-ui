export function normalize(message: string) {
  return decodeURIComponent(message)
    .replace(/./, (c) => c.toUpperCase())
    .concat(message.endsWith(".") ? "" : ".");
}
