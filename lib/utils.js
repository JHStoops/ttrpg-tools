function getRandomInteger(maxValue, minValue = 1) {
  if (minValue === maxValue) return minValue
  if (maxValue < minValue) throw Error('getRandomInteger(): minValue must be less than maxValue.')
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue) // Return values minValue - maxValue
}

function getRandomElement(collection) {
  return collection[getRandomInteger(collection.length - 1, 0)]
}

module.exports = { getRandomElement, getRandomInteger }
