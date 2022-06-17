import { getRandomElement } from '../lib/utils'
import { givenNames, familyNames } from '../data/names.json'
import { descriptors, prefixes, suffixes } from '../data/towns.json'

export function generateNpcName(sex) {
  if (!sex) throw Error('generateNpcName(): sex is a required parameter.')
  const givenName = getRandomElement(givenNames[sex])
  const familyName = getRandomElement(familyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}

export function generateTownName() {
  let townName = ''

  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(descriptors)

  townName += getRandomElement(prefixes)
  townName += getRandomElement(suffixes)

  return townName
}
