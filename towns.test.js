const { generateTown } = require('./towns')

describe('generateTown', () => {
  it('should exist', () => {
    expect(generateTown).toBeInstanceOf(Function)
  })

  it('should generate an NPC', () => {
    const townName = generateTown()
    expect(typeof townName).toBe('string')
  })
})
