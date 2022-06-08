const { getRandomElement } = require('../lib/utils')
const { givenNames, familyNames } = require('../data/names.json')
const classes = require('../data/classes.json')
const languages = require('../data/languages.json')
const races = require('../data/races.json')
const { generateTown } = require('./towns')

function generateNpc(sex = Math.random() > 0.5 ? 'female' : 'male') {
  if (![ undefined, 'female', 'male' ].includes(sex)) throw Error('generateNpc(): sex paramter must be either "female", "male", or undefined.')

  const givenName = getRandomElement(givenNames[sex])
  const familyName = getRandomElement(familyNames)

  return {
    class: getRandomElement(classes),
    familyName,
    fullName: `${givenName} ${familyName}`,
    givenName,
    hometown: generateTown(),
    languages: [ ...new Set([ 'Common', getRandomElement(languages) ]) ], // Speak Common and up to one other language
    race: getRandomElement(races),
    sex,
  }
}

module.exports = { generateNpc }
