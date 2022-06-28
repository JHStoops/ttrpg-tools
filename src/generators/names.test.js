import { generateNpcName, generateTownName } from './names.js'

describe('generateNpcName', () => {
  it('should exist', () => {
    expect(generateNpcName).toBeInstanceOf(Function)
  })

  it('should generate an NPC name', () => {
    const npcName = generateNpcName('male')
    expect(typeof npcName.givenName).toBe('string')
    expect(typeof npcName.familyName).toBe('string')
    expect(npcName.fullName).toBe(`${npcName.givenName} ${npcName.familyName}`)
  })

  it('should throw an error on missing `sex` parameter', () => {
    expect(() => generateNpcName()).toThrow(Error('generateNpcName(): sex is a required parameter.'))
  })
})

describe('generateTownName', () => {
  it('should exist', () => {
    expect(generateTownName).toBeInstanceOf(Function)
  })

  it('should generate a Town name', () => {
    const townName = generateTownName()
    expect(typeof townName).toBe('string')
  })
})
