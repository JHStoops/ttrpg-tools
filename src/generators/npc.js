import { getRandomElement, getRandomStandardDev } from '../lib/utils.js'
import { data } from '../data/customizeData.js'
import { generateNpcName, generateTownName } from './names.js'

export function getRandomStat(isMainStat, isDumpStat) {
  const MAX_STAT = 20
  const mean = 0.55 + (isMainStat ? 0.15 : 0) - (isDumpStat ? 0.15 : 0) // increase or reduce bell curve mean if it's a main or dump stat
  const stdev = 0.15 - ((isMainStat || isDumpStat) ? 0.1 : 0) // Reduce variance if it's a main or dump stat

  // Transform to the desired mean and standard deviation:
  return Math.round(getRandomStandardDev(mean, stdev) * MAX_STAT)
}

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
    languages: languages ?? [ ...new Set([ 'Common', getRandomElement(data.languages.get()), ...npcRace.languages ]) ], // Speak Common and up to one other language
    ...name,
    occupation: occupation ?? getRandomElement(data.occupations.get()),
    // TODO: Remove `race` in next major version and rename `raceName` to be `race`
    race,
    raceName: npcRace.name,
    sex: npcSex,
    age: Math.round(getRandomStandardDev(npcRace.avgAgeOfDeath / 2, 12)),
    size: npcRace.size,
    height: Number(getRandomStandardDev(npcRace.avgHeight, 0.25).toFixed(2)),
    weight: Math.round(getRandomStandardDev(npcRace.avgWeight, 10)),
    speeds: {
      climb: npcRace.baseClimbSpeed,
      flight: npcRace.baseFlightSpeed,
      swim: npcRace.baseSwimSpeed,
      walk: npcRace.baseWalkSpeed,
    },
    stats: {
      strength: getRandomStat(),
      dexterity: getRandomStat(),
      constitution: getRandomStat(),
      intelligence: getRandomStat(),
      wisdom: getRandomStat(),
      charisma: getRandomStat(),
    },
  }
}
