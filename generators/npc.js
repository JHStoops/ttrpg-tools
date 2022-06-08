const { getRandomElement } = require('utils')
const { givenNames, familyNames } = require('data/names')
const classes = require('data/classes')
const races = require('data/races')
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
    race: getRandomElement(races),
    sex,
  }
}

module.exports = { generateNpc }
