import { getRandomElement } from '../../lib/utils.js'
import townNames from '../../data/towns.json'
export { townNames }

// Make name parts customizable
const { descriptors, prefixes, suffixes } = townNames
let townNameDescriptors = [ ...descriptors ]
let townNamePrefixes = [ ...prefixes ]
let townNameSuffixes = [ ...suffixes ]

export function getCustomTownNames() {
  return ({
    descriptors: townNameDescriptors,
    prefixes: townNamePrefixes,
    suffixes: townNameSuffixes
  })
}

export function resetTownNameData() {
  townNameDescriptors = [ ...descriptors ]
  townNamePrefixes = [ ...prefixes ]
  townNameSuffixes = [ ...suffixes ]
}

export function generateTownName() {
  let townName = ''

  // Add a descriptor to the town name 20% of the time
  if (Math.random > 0.8) townName += getRandomElement(townNameDescriptors)

  townName += getRandomElement(townNamePrefixes)
  townName += getRandomElement(townNameSuffixes)

  return townName
}

export function customizeTownNameData(newData, replace) {
  const { descriptors: newDescriptors, prefixes: newPrefixes, suffixes: newSuffixes } = newData ?? {}

  // Make sure newData has correct shape
  if (newData?.constructor !== Object) throw Error('customizeTownNameData(): newData must be an object.')
  if (!newDescriptors && !newPrefixes && !newSuffixes) throw Error('customizeTownNameData(): newData must have at least one of these properties: descriptors, prefixes, suffixes.')
  if (newDescriptors && (newDescriptors.constructor !== Array || newDescriptors.some(newDescriptor => newDescriptor.constructor !== String))) throw Error('customizeTownNameData(): newData.newDescriptors must be an Array of strings.')
  if (newPrefixes && (newPrefixes.constructor !== Array || newPrefixes.some(newPrefix => newPrefix.constructor !== String))) throw Error('customizeTownNameData(): newData.newPrefixes must be an Array of strings.')
  if (newSuffixes && (newSuffixes.constructor !== Array || newSuffixes.some(newSuffix => newSuffix.constructor !== String))) throw Error('customizeTownNameData(): newData.newSuffixes must be an Array of strings.')

  // Update data!
  if (newDescriptors) townNameDescriptors = replace ? newDescriptors : [ ...townNameDescriptors, ...newDescriptors ]
  if (newPrefixes) townNamePrefixes = replace ? newPrefixes : [ ...townNamePrefixes, ...newPrefixes ]
  if (newSuffixes) townNameSuffixes = replace ? newSuffixes : [ ...townNameSuffixes, ...newSuffixes ]
}
