const { generateNpc } = require('./npc')
const { givenNames } = require('../data/names.json')

describe('generateNpc', () => {
  it('should exist', () => {
    expect(generateNpc).toBeInstanceOf(Function)
  })

  it('should generate an NPC', () => {
    const npc = generateNpc()
    expect(typeof npc.class).toBe('string')
    expect(typeof npc.familyName).toBe('string')
    expect(typeof npc.fullName).toBe('string')
    expect(typeof npc.givenName).toBe('string')
    expect(typeof npc.hometown).toBe('string')
    expect(typeof npc.race).toBe('string')
    expect(typeof npc.sex).toBe('string')
  })

  it('should use provided sex (male)', () => {
    const npc = generateNpc('male')
    expect(givenNames.male).toContain(npc.givenName)
    expect(npc.sex).toBe('male')
  })

  it('should use provided sex (female)', () => {
    const npc = generateNpc('female')
    expect(givenNames.female).toContain(npc.givenName)
    expect(npc.sex).toBe('female')
  })

  it('should throw an error if sex is an invalid value', () => {
    expect(() => generateNpc('Owlbear')).toThrow(Error('generateNpc(): sex paramter must be either "female", "male", or undefined.'))
  })
})
