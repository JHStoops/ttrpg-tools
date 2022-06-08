const { getRandomElement } = require('../lib/utils')
const { descriptors, prefixes, suffixes } = require('../data/towns.json')

function generateTown() {
  let townName = ''

  // Add a descriptor to the name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(descriptors)

  townName += getRandomElement(prefixes)
  townName += getRandomElement(suffixes)

  return townName
}

module.exports = { generateTown }
