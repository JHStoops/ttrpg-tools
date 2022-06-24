import { getRandomElement } from '../lib/utils.js'
import classes from '../data/classes.json'
import dndLanguages from '../data/languages.json'
import occupations from '../data/occupations.json'
import races from '../data/races.json'
import { generateNpcName, generateTownName } from './names.js'
export {classes, dndLanguages as languages, occupations}

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
