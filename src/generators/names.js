import { getRandomElement } from '../lib/utils.js'
import npcNames from '../data/names.json'
import townNames from '../data/towns.json'
export { npcNames, townNames }

// Make name parts customizable
const { givenNames, familyNames } = npcNames
const { male, female } = givenNames
let npcMaleGivenNames = male
let npcFemaleGivenNames = female
let npcFamilyNames = familyNames

// Make name parts customizable
const { descriptors, prefixes, suffixes } = townNames
let townNameDescriptors = descriptors
let townNamePrefixes = prefixes
let townNameSuffixes = suffixes

export function generateNpcName(sex) {
  if (!sex) throw Error('generateNpcName(): sex is a required parameter.')
  let possibleGivenNames = []
  if (sex === 'male') possibleGivenNames = npcMaleGivenNames
  if (sex === 'female') possibleGivenNames = npcFemaleGivenNames
  const givenName = getRandomElement(possibleGivenNames)
  const familyName = getRandomElement(npcFamilyNames)
  return { familyName, givenName, fullName: `${givenName} ${familyName}` }
}

export function generateTownName() {
  let townName = ''

  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(townNameDescriptors)

  townName += getRandomElement(townNamePrefixes)
  townName += getRandomElement(townNameSuffixes)

  return townName
}

export function resetTownNameData() {
  townNameDescriptors = descriptors
  townNamePrefixes = prefixes
  townNameSuffixes = suffixes
}

export function customizeNpcNameData(newData, replace) {
  const { givenNames: newGivenNames, familyNames: newFamilyNames } = newData
  const { male: newMale, female: newFemale } = newGivenNames ?? {}

  // Make sure newData has correct shape
  if (newData?.constructor !== Object) throw Error('addTownNameData(): newData must be an object.')
  if (!newFamilyNames && !newGivenNames) throw Error('addTownNameData(): newData must at least one of these properties: familyNames, givenNames.')
  if (newGivenNames && newGivenNames?.constructor !== Object) throw Error('addTownNameData(): newGivenNames must be an object.')
  if (newGivenNames && !(newGivenNames.male || newGivenNames.female)) throw Error('addTownNameData(): newGivenNames must have at least one of these properties: female, male.')
  if (newFamilyNames && (newFamilyNames.constructor !== Array || newFamilyNames[0].constructor !== String)) throw Error('addTownNameData(): newData.newFamilyNames must be an Array of strings.')
  if (newMale && (newMale.constructor !== Array || newMale[0].constructor !== String)) throw Error('addTownNameData(): newData.givenNames.male must be an Array of strings.')
  if (newFemale && (newFemale.constructor !== Array || newFemale[0].constructor !== String)) throw Error('addTownNameData(): newData.givenNames.female must be an Array of strings.')

  // Update data!
  if (newFamilyNames) npcFamilyNames = replace ? newFamilyNames : [ ...npcFamilyNames, ...newFamilyNames ]
  if (newMale) npcMaleGivenNames = replace ? newMale : [ ...npcMaleGivenNames, ...newMale ]
  if (newFemale) npcFemaleGivenNames = replace ? newFemale : [ ...npcFemaleGivenNames, ...newFemale ]
}

export function customizeTownNameData(newData, replace) {
  const { descriptors: newDescriptors, prefixes: newPrefixes, suffixes: newSuffixes } = newData ?? {}

  // Make sure newData has correct shape
  if (newData?.constructor !== Object) throw Error('customizeNpcNameData(): newData must be an object.')
  if (!newDescriptors && !newPrefixes && !newSuffixes) throw Error('customizeNpcNameData(): newData must have at least one of these properties: descriptors, prefixes, suffixes.')
  if (newDescriptors && (newDescriptors.constructor !== Array || newDescriptors[0].constructor !== String)) throw Error('customizeNpcNameData(): newData.newDescriptors must be an Array of strings.')
  if (newPrefixes && (newPrefixes.constructor !== Array || newPrefixes[0].constructor !== String)) throw Error('customizeNpcNameData(): newData.newPrefixes must be an Array of strings.')
  if (newSuffixes && (newSuffixes.constructor !== Array || newSuffixes[0].constructor !== String)) throw Error('customizeNpcNameData(): newData.newSuffixes must be an Array of strings.')

  // Update data!
  if (newDescriptors) townNameDescriptors = replace ? newDescriptors : [ ...townNameDescriptors, ...newDescriptors ]
  if (newPrefixes) townNamePrefixes = replace ? newPrefixes : [ ...townNamePrefixes, ...newPrefixes ]
  if (newSuffixes) townNameSuffixes = replace ? newSuffixes : [ ...townNameSuffixes, ...newSuffixes ]
}
