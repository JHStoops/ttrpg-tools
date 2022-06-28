import { getRandomElement } from '../../lib/utils.js'
import npcNames from '../../data/names.json'
export { npcNames }

// Make name parts customizable
const { givenNames, familyNames } = npcNames
const { male, female } = givenNames
let maleGivenNames = [ ...male ]
let femaleGivenNames = [ ...female ]
let npcFamilyNames = [ ...familyNames ]

export function getCustomNpcNames() {
  return ({
    givenNames: {
      male: maleGivenNames,
      female: femaleGivenNames
    },
    familyNames: npcFamilyNames
  })
}

export function resetNpcNameData() {
  maleGivenNames = [ ...male ]
  femaleGivenNames = [ ...female ]
  npcFamilyNames = [ ...familyNames ]
}

export function customizeNpcNameData(newData, replace) {
  const { givenNames: newGivenNames, familyNames: newFamilyNames } = newData
  const { male: newMale, female: newFemale } = newGivenNames ?? {}

  // Make sure newData has correct shape
  if (newData?.constructor !== Object) throw Error('customizeNpcNameData(): newData must be an object.')
  if (!newFamilyNames && !newGivenNames) throw Error('customizeNpcNameData(): newData must at least one of these properties: familyNames, givenNames.')
  if (newGivenNames && newGivenNames?.constructor !== Object) throw Error('customizeNpcNameData(): newGivenNames must be an object.')
  if (newGivenNames && !(newGivenNames.male || newGivenNames.female)) throw Error('customizeNpcNameData(): newGivenNames must have at least one of these properties: female, male.')
  if (newFamilyNames && (newFamilyNames.constructor !== Array || newFamilyNames.some(newFamilyName => newFamilyName.constructor !== String))) throw Error('customizeNpcNameData(): newData.newFamilyNames must be an Array of strings.')
  if (newMale && (newMale.constructor !== Array || newMale.some(newMale => newMale.constructor !== String))) throw Error('customizeNpcNameData(): newData.givenNames.male must be an Array of strings.')
  if (newFemale && (newFemale.constructor !== Array || newFemale.some(newFemale => newFemale.constructor !== String))) throw Error('customizeNpcNameData(): newData.givenNames.female must be an Array of strings.')

  // Update data!
  if (newFamilyNames) npcFamilyNames = replace ? newFamilyNames : [ ...npcFamilyNames, ...newFamilyNames ]
  if (newMale) maleGivenNames = replace ? newMale : [ ...maleGivenNames, ...newMale ]
  if (newFemale) femaleGivenNames = replace ? newFemale : [ ...femaleGivenNames, ...newFemale ]
}

export function generateNpcName(sex) {
  if (!sex) throw Error('generateNpcName(): sex is a required parameter.')
  let possibleGivenNames = []
  if (sex === 'male') possibleGivenNames = maleGivenNames
  if (sex === 'female') possibleGivenNames = femaleGivenNames
  const givenName = getRandomElement(possibleGivenNames)
  const familyName = getRandomElement(npcFamilyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}
