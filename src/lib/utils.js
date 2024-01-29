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

// Standard Normal variate using Box-Muller transform.
// Found this Standard Normal variation function here: https://stackoverflow.com/a/36481059
export function getRandomStandardDev(mean = 0, stdev = 1) {
  const u = 1 - Math.random() // Converting [0,1) to (0,1]
  const v = Math.random()
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  // Transform to the desired mean and standard deviation:
  return z * stdev + mean
}
