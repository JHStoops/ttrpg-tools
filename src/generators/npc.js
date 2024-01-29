import { getRandomElement } from '../lib/utils.js'
import { data } from '../data/customizeData.js'
import { generateNpcName, generateTownName } from './names.js'

/**
 * @param {String} familyName - Specify the character's family name.
 * @param {String} givenName - Specify the character's given name.
 * @param {String} homeTown - Specify the hometown of the character.
 * @param {Array} languages - Specify the languages spoken by the character.
 * @param {String} npcClass - Specify the class of the character (barbarian/cleric/etc).
 * @param {String} npcSubclass - Specify the subclass of the character (Alchemist, College of Valor, Life Domain, etc).
 * @param {String} occupation - Specify the occupation of the character (adventurer/merchant/etc).
 * @param {Boolean} randomizeClass - Whether to randomize the NPC's class. Guarantees NPC has a class, otherwise NPC only has a small chance of having a class.
 * @param {String} race - Specify the race of the character (Orc/Human/etc).
 * @param {String} sex - Specify the sex of the character (male/female).
 * @returns {Object} - a randomized NPC
 */
export function generateNpc({
  familyName, givenName, homeTown, languages, npcClass, npcSubclass, occupation, race, randomizeClass, sex,
} = {}) {
  if (![ undefined, 'female', 'male' ].includes(sex)) throw Error('generateNpc(): sex paramter must be either "female", "male", or undefined.')
  const npcSex = [ 'female', 'male' ].includes(sex) ? sex : getRandomElement([ 'female', 'male' ])

  const races = data.races.get()
  const npcRace = race && Object.keys(races).includes(race) ? races[race] : races[getRandomElement(Object.keys(races))]

  let npcClassFinal = npcClass ?? ''
  if (randomizeClass || (!npcClass && Math.random() > 0.9)) npcClassFinal = getRandomElement(data.classes.get()) // Unless a class is specified, 90% of people are average Joe's with zero class
  let npmSubclassFinal = npcSubclass ?? ''
  if (npcClassFinal) npmSubclassFinal = getRandomElement(data.subclasses.get(npcClassFinal))
  const npcGivenName = givenName ?? generateNpcName(npcSex).givenName
  const npcFamilyName = familyName ?? generateNpcName(npcSex).familyName
  const name = { givenName: npcGivenName, familyName: npcFamilyName, fullName: `${npcGivenName} ${npcFamilyName}` }

  return {
    class: npcClassFinal,
    subclass: npmSubclassFinal,
    homeTown: homeTown ?? generateTownName(),
    languages: languages ?? [ ...new Set([ 'Common', getRandomElement(data.languages.get()) ]) ], // Speak Common and up to one other language
    ...name,
    occupation: occupation ?? getRandomElement(data.occupations.get()),
    race: npcRace,
    sex: npcSex,
  }
}
