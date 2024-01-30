import { generateNpc } from './npc.js'
import { data } from '../data/customizeData.js'

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
    expect(typeof npc.homeTown).toBe('string')
    expect(npc.languages).toBeInstanceOf(Array)
    expect(typeof npc.occupation).toBe('string')
    expect(typeof npc.race).toBe('object')
    expect(typeof npc.sex).toBe('string')
  })

  describe('specified sex', () => {
    it('should use provided sex (male)', () => {
      const npc = generateNpc({ sex: 'male' })
      expect(data.npcNames.get().givenNames.male).toContain(npc.givenName)
      expect(npc.sex).toBe('male')
    })

    it('should use provided sex (female)', () => {
      const npc = generateNpc({ sex: 'female' })
      expect(data.npcNames.get().givenNames.female).toContain(npc.givenName)
      expect(npc.sex).toBe('female')
    })

    it('should throw an error if sex is an invalid value', () => {
      expect(() => generateNpc({ sex: 'Owlbear' })).toThrow(Error('generateNpc(): sex paramter must be either "female", "male", or undefined.'))
    })
  })

  describe('specified name', () => {
    it('should use provided name', () => {
      const name = { givenName: 'C3PO', familyName: 'R2D2' }
      const npc = generateNpc(name)
      expect(npc.givenName).toBe(name.givenName)
      expect(npc.familyName).toBe(name.familyName)
      expect(npc.fullName).toBe(`${name.givenName} ${name.familyName}`)
    })

    it('should generate a randomized givenName if `givenName` is not provided', () => {
      const name = { familyName: 'R2D2' }
      const npc = generateNpc(name)
      expect(npc.familyName).toBe(name.familyName)
    })

    it('should generate a randomized familyName if `familyName` is not provided', () => {
      const name = { givenName: 'C3PO' }
      const npc = generateNpc(name)
      expect(npc.givenName).toBe(name.givenName)
    })
  })

  describe('specified race', () => {
    it('should use provided race', () => {
      const npc = generateNpc({ race: Object.keys(data.races.get())[0] })
      expect(npc.race).toEqual(Object.values(data.races.get())[0])
    })
  })

  describe('specified home town', () => {
    it('should use provided home town', () => {
      const homeTown = 'Tatooine'
      const npc = generateNpc({ homeTown })
      expect(npc.homeTown).toEqual(homeTown)
    })
  })

  describe('specified languages', () => {
    it('should use provided languages', () => {
      const languages = [ 'Norwegian', 'Spanish', 'English' ]
      const npc = generateNpc({ languages })
      expect(npc.languages).toEqual(languages)
    })
  })

  describe('specified class', () => {
    it('should use provided class', () => {
      const npcClass = 'Druid'
      const npc = generateNpc({ npcClass })
      expect(npc.class).toEqual(npcClass)
    })

    it('should randomly assign a class with `randomizeClass`', () => {
      const npc = generateNpc({ randomizeClass: true })
      expect(npc.class).toBeTruthy()
    })
  })

  describe('specified occupation', () => {
    it('should use provided race', () => {
      const occupation = 'Adventurer'
      const npc = generateNpc({ occupation })
      expect(npc.occupation).toEqual(occupation)
    })
  })
})
