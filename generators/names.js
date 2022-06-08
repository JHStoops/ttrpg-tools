const { getRandomElement } = require('../lib/utils')
const { givenNames, familyNames } = require('../data/names.json')
const { descriptors, prefixes, suffixes } = require('../data/towns.json')

function generateNpcName(sex) {
  const givenName = getRandomElement(givenNames[sex])
  const familyName = getRandomElement(familyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}

function generateTownName() {
  let townName = ''

  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(descriptors)

  townName += getRandomElement(prefixes)
  townName += getRandomElement(suffixes)

  return townName
}

module.exports = { generateNpcName, generateTownName }
