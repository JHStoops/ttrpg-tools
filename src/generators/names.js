import { getRandomElement } from '../lib/utils.js'
import { data } from '../data/customizeData'

export function generateNpcName(sex) {
  if (!sex) throw Error('generateNpcName(): sex is a required parameter.')
  let possibleGivenNames = []
  if (sex === 'male') possibleGivenNames = data.npcNames.get().givenNames.male
  if (sex === 'female') possibleGivenNames = data.npcNames.get().givenNames.female
  const givenName = getRandomElement(possibleGivenNames)
  const familyName = getRandomElement(data.npcNames.get().familyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}

export function generateTownName() {
  let townName = ''

  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(data.townNames.get().descriptors)

  townName += getRandomElement(data.townNames.get().prefixes)
  townName += getRandomElement(data.townNames.get().suffixes)

  return townName
}
