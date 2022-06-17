export function getRandomInteger(maxValue, minValue = 1) {
  if (minValue === maxValue) return minValue
  if (maxValue < minValue) throw Error('getRandomInteger(): minValue must be less than maxValue.')
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue) // Return values minValue - maxValue
}

export function getRandomElement(collection) {
  if (collection?.constructor !== Array) throw Error('getRandomElement(): collection must be an instance of Array.')
  if (collection.length === 0) throw Error('getRandomElement(): collection cannot be an empty array.')
  return collection[getRandomInteger(collection.length - 1, 0)]
}
