import { getRandomElement } from '../lib/utils.js'
import { generateNpcName } from './names/npcNames.js'
import { generateTownName } from './names/townNames.js'
import classes from '../data/classes.json'
import dndLanguages from '../data/languages.json'
import occupations from '../data/occupations.json'
import races from '../data/races.json'
export { classes, dndLanguages as languages, occupations, races }

// Make classes, languages, occupations, and races customizable
let availableClasses = [ ...classes ]
let availableLanguages = [ ...dndLanguages ]
let availableOccupations = [ ...occupations ]
let availableRaces = { ...races }

export const getCustomClasses = () => availableClasses
export const getCustomLanguages = () => availableLanguages
export const getCustomOccupations = () => availableOccupations
export const getCustomRaces = () => availableRaces

export const resetClassesData = () => { availableClasses = [ ...classes ] }
export const resetLanguagesData = () => { availableLanguages = [ ...dndLanguages ] }
export const resetOccupationsData = () => { availableOccupations = [ ...occupations ] }
export const resetRacesData = () => { availableRaces = [ ...races ] }

function customizeArrayData(newData, dataType, replace) {
  // Make sure newData has correct shape
  if (newData?.constructor !== Array) throw Error('customizeArrayData(): newData must be an Array.')
  if (Object.values(newData).some(newClass => newClass.constructor !== String)) throw Error('customizeArrayData(): newData must be an Array of strings.')

  // Update data!
  switch (dataType) {
    case 'classes':
      availableClasses = replace ? newData : [ ...availableClasses, ...newData ]
      break
    case 'languages':
      availableLanguages = replace ? newData : [ ...availableLanguages, ...newData ]
      break
    case 'occupations':
      availableOccupations = replace ? newData : [ ...availableOccupations, ...newData ]
      break
  }
}

export const customizeClassesData = (newClasses, replace) => customizeArrayData(newClasses, availableClasses, replace)
export const customizeLanguagesData = (newLanguages, replace) => customizeArrayData(newLanguages, availableLanguages, replace)
export const customizeOccupationData = (newOccupation, replace) => customizeArrayData(newOccupation, availableOccupation, replace)
export function customizeRacesData(newRaces, availableData, replace) {
  // Make sure newRaces has correct shape
  if (newRaces?.constructor !== Object) throw Error('customizeRacesData(): newRaces must be an Object.')
  if (Object.value(newRaces).some(newClass => newClass.constructor !== Object)) throw Error('customizeRacesData(): newRaces must be an Object of Race Objects.')
  if (Object.value(newRaces).some(newClass => !newClass.name || newClass.name.constructor !== String)) throw Error('customizeRacesData(): newRaces must be Object and have a `name` string property.')

  // Make sure all new races have all properties. Missing properties will default to human values.
  const normalizedRaces = newRaces.map(({
    name,
    avgAgeOfDeath,
    avgHeight,
    avgWeight,
    size,
    baseClimbSpeed,
    baseFlightSpeed,
    baseSwimSpeed,
    baseWalkSpeed,
    languages
  }) => ({
    name: name,
    avgAgeOfDeath: avgAgeOfDeath ?? availableRaces.Human.avgAgeOfDeath,
    avgHeight: avgHeight ?? availableRaces.Human.avgHeight,
    avgWeight: avgWeight ?? availableRaces.Human.avgWeight,
    size: size ?? availableRaces.Human.size,
    baseClimbSpeed: baseClimbSpeed ?? availableRaces.Human.baseClimbSpeed,
    baseFlightSpeed: baseFlightSpeed ?? availableRaces.Human.baseFlightSpeed,
    baseSwimSpeed: baseSwimSpeed ?? availableRaces.Human.baseSwimSpeed,
    baseWalkSpeed: baseWalkSpeed ?? availableRaces.Human.baseWalkSpeed,
    languages: languages ?? availableRaces.Human.languages
  }))

  // Update data!
  availableData = replace ? normalizedRaces : [ ...availableData, ...normalizedRaces ]
}

/**
 * @param {String} familyName - Specify the character's family name.
 * @param {String} givenName - Specify the character's given name.
 * @param {String} homeTown - Specify the hometown of the character.
 * @param {Array} languages - Specify the languages spoken by the character.
 * @param {String} npcClass - Specify the class of the character (barbarian/cleric/etc).
 * @param {String} occupation - Specify the occupation of the character (adventurer/merchant/etc).
 * @param {Boolean} randomizeClass - Whether to randomize the NPC's class. Guarantees NPC has a class, otherwise NPC only has a small chance of having a class.
 * @param {String} race - Specify the race of the character (Orc/Human/etc).
 * @param {String} sex - Specify the sex of the character (male/female).
 * @returns {Object} - a randomized NPC
 */
export function generateNpc({
  familyName, givenName, homeTown, languages, npcClass, occupation, race, randomizeClass, sex,
} = {}) {
  if (![ undefined, 'female', 'male' ].includes(sex)) throw Error('generateNpc(): sex paramter must be either "female", "male", or undefined.')
  const npcSex = [ 'female', 'male' ].includes(sex) ? sex : getRandomElement([ 'female', 'male' ])

  const npcRace = race && Object.keys(races).includes(race) ? races[race] : races[getRandomElement(Object.keys(races))]

  let npcClassFinal = npcClass ?? ''
  if (randomizeClass || (!npcClass && Math.random() > 0.9)) npcClassFinal = getRandomElement(classes) // Unless a class is specified, 90% of people are average Joe's with zero class
  const name = givenName && familyName ? { givenName, familyName, fullName: `${givenName} ${familyName}` } : generateNpcName(npcSex)

  return {
    class: npcClassFinal,
    homeTown: homeTown ?? generateTownName(),
    languages: languages ?? [ ...new Set([ 'Common', getRandomElement(dndLanguages) ]) ], // Speak Common and up to one other language
    ...name,
    occupation: occupation ?? getRandomElement(occupations),
    race: npcRace,
    sex: npcSex,
  }
}

