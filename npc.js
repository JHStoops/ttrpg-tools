const { getRandomElement } = require('./helpers/utils')
const { generateTown } = require('./towns')
const { givenNames, familyNames } = require('./data/names')
const classes = require('./data/classes')
const races = require('./data/races')

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
