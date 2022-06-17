const { generateTown } = require('./towns')
const dndRaces = require('../data/races.json')

describe('generateTown', () => {
  it('should exist', () => {
    expect(generateTown).toBeInstanceOf(Function)
  })

  it('should generate a Town', () => {
    const town = generateTown()
    expect(typeof town).toBe('object')
    expect(typeof town.leader).toBe('object')
    expect(typeof town.name).toBe('string')
    expect(typeof town.size).toBe('number')
    expect(town.languages).toBeInstanceOf(Array)
    expect(town.races).toBeInstanceOf(Array)
  })

  it('should use provided `name` as town\'s name', () => {
    const name = 'Valhalla'
    const town = generateTown({ name })
    expect(town.name).toBe(name)
  })

  it('should use provided `size` as town\'s size', () => {
    const size = 123456
    const town = generateTown({ size })
    expect(town.size).toBe(size)
  })

  it('should use provided `races` as town\'s most prevalent races', () => {
    const races = Object.values(dndRaces).slice(0, 3)
    const town = generateTown({ races: races.map((race) => race.name) })
    expect(town.races).toEqual(races)
  })
})
