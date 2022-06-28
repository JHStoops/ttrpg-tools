import { generateTownName } from './townNames.js'

describe('generateTownName', () => {
  it('should exist', () => {
    expect(generateTownName).toBeInstanceOf(Function)
  })

  it('should generate a Town name', () => {
    const townName = generateTownName()
    expect(typeof townName).toBe('string')
  })
})
