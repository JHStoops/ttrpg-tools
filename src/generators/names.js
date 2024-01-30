import { getRandomElement } from '../lib/utils.js'
import { data } from '../data/customizeData.js'

/**
 * @description Generate a name for an NPC.
 * @param {String} sex - Specify the sex of the NPC. Required to be 'male' or 'female'.
 * @returns {Object} an object with the name NPC's name parts.
 */
export function generateNpcName(sex) {
  if (!sex) throw Error('generateNpcName(): sex is a required parameter.')
  if (![ 'male', 'female' ].includes(sex)) throw Error("generateNpcName(): sex must be 'male' or 'female'.")
  let possibleGivenNames = []
  if (sex === 'male') possibleGivenNames = data.npcNames.get().givenNames.male
  if (sex === 'female') possibleGivenNames = data.npcNames.get().givenNames.female
  const givenName = getRandomElement(possibleGivenNames)
  const familyName = getRandomElement(data.npcNames.get().familyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}

/**
 * @description Generate a name for a town.
 * @param {Boolean} withDescriptor - Whether to guarantee a descriptor name part, otherwise there's a 20% chance of including a descriptor name part.
 * @param {Boolean} withPostDescriptor - Whether to guarantee a postDescriptor name part, otherwise there's a 20% chance of including a postDescriptor name part.
 * @param {Boolean} usePremade - Whether to guarantee using a premade town name. Ignores `withDescriptor` and `withPostDescriptor` parameters.
 * @returns {String} The town's name.
 */
export function generateTownName(withDescriptor, withPostDescriptor, usePremade) {
  if (usePremade) return getRandomElement(data.townNames.get().premades)

  let townName = ''
  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8 || withDescriptor) townName += `${getRandomElement(data.townNames.get().descriptors)} `

  townName += getRandomElement(data.townNames.get().prefixes)
  townName += getRandomElement(data.townNames.get().suffixes)

  // Add a postDescriptor to the town name 20% of the time
  if (Math.random > 0.8 || withPostDescriptor) townName += ` ${getRandomElement(data.townNames.get().postDescriptors)} `

  return townName
}
