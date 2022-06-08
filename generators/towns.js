const { getRandomElement, getRandomInteger } = require('../lib/utils')
const dndRaces = require('../data/races.json')
const { generateTownName } = require('./names')
const { generateNpc } = require('./npc')

const townSizes = {
  xs: { min: 5, max: 20 },
  sm: { min: 21, max: 50 },
  md: { min: 51, max: 100 },
  lg: { min: 101, max: 250 },
  xl: { min: 251, max: 1000 },
  'New York': { min: 1001, max: 8380000 },
}

/**
 *
 * @param {String} name - Specify the name of the town.
 * @param {Array} races - Specify most prevalent races in the town.
 * @param {String|Number} size - The size of the town. Possible values: a specific number OR 'xs', 'sm', 'md', 'lg', 'xl', 'New York' for randomized ranges.
 * @returns {Object} randomized town
 */
function generateTown({ name, races, size } = {}) {
  const townSize = size ?? getRandomElement(Object.keys(townSizes))
  const townSizeRange = Number.isInteger(townSize) ? townSize : townSizes[townSize]

  // Randomly assign races to town unless specified
  const townRaces = []
  if (Array.isArray(races)) {
    races.forEach((race) => Object.keys(dndRaces).includes(race) && townRaces.push(dndRaces[race]))
  }
  if (!townRaces.length) {
    const prevalentRacesCount = getRandomInteger(5, 1)
    Array(prevalentRacesCount).fill('').forEach(() => townRaces.push(getRandomElement(Object.values(dndRaces))))
  }

  // Assign languages based on prevalent races
  const languages = townRaces.reduce((acc, race) => [ ...new Set([ ...acc, ...race.languages ]) ], [])

  return {
    languages,
    leader: generateNpc({ languages, occupation: 'Mayor', race: getRandomElement(townRaces) }),
    name: name ?? generateTownName(),
    races: [ ...new Set(townRaces) ],
    size: Number.isInteger(size) ? size : getRandomInteger(townSizeRange.max, townSizeRange.min),
  }
}

module.exports = { generateTown }
