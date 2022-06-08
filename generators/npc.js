const { getRandomElement } = require('../lib/utils')
const { givenNames, familyNames } = require('../data/names.json')
const classes = require('../data/classes.json')
const languages = require('../data/languages.json')
const occupations = require('../data/occupations.json')
const races = require('../data/races.json')
const { generateTown } = require('./towns')

/**
 * @param {String} homeTown - Specify the hometown of the character.
 * @param {String} npcClass - Specify the class of the character (barbarian/cleric/etc).
 * @param {String} occupation - Specify the occupation of the character (adventurer/merchant/etc).
 * @param {Boolean} randomizeClass - Whether to randomize the NPC's class. Guarantees NPC has a class, otherwise NPC only has a small chance of having a class.
 * @param {String} race - Specify the race of the character (Orc/Human/etc).
 * @param {String} sex - Specify the sex of the character (male/female).
 * @returns {Object} - a randomized NPC
 */
function generateNpc({
  homeTown, npcClass, occupation, race, randomizeClass, sex = Math.random() > 0.5 ? 'female' : 'male',
} = {}) {
  if (![ 'female', 'male' ].includes(sex)) throw Error('generateNpc(): sex paramter must be either "female", "male".')

  let npcClassFinal = npcClass
  if (randomizeClass || (!npcClass && Math.random() > 0.9)) npcClassFinal = getRandomElement(classes) // Unless a class is specified, 90% of people are average Joe's with zero class
  const givenName = getRandomElement(givenNames[sex])
  const familyName = getRandomElement(familyNames)

  return {
    class: npcClassFinal,
    familyName,
    fullName: `${givenName} ${familyName}`,
    givenName,
    hometown: homeTown ?? generateTown(),
    languages: [ ...new Set([ 'Common', getRandomElement(languages) ]) ], // Speak Common and up to one other language
    occupation: occupation ?? getRandomElement(occupations),
    race: race ?? getRandomElement(races),
    sex,
  }
}

module.exports = { generateNpc }
