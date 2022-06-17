const { getRandomElement, getRandomInteger } = require('./utils')

describe('utils', () => {
  describe('getRandomInteger', () => {
    it('should return an int between min and max (inclusive)', () => {
      const min = 0
      const max = 10
      for (let i = 0; i < 10; i++) {
        const randomInt = getRandomInteger(max, min)
        expect(randomInt).toBeLessThanOrEqual(max)
        expect(randomInt).toBeGreaterThanOrEqual(min)
      }
    })

    it('should return min value if min and max are the same', () => {
      const min = 10
      const max = 10
      expect(getRandomInteger(max, min)).toBeLessThanOrEqual(min)
    })

    it('should return min value if min and max are the same (with default min value 1)', () => {
      const max = 1
      expect(getRandomInteger(max)).toBeLessThanOrEqual(max)
    })

    it('should throw an error if max is less than', () => {
      const min = 20
      const max = 10
      expect(() => getRandomInteger(max, min)).toThrow(Error('getRandomInteger(): minValue must be less than maxValue.'))
    })
  })

  describe('getRandomElement', () => {
    it('should return a random element from the collection', () => {
      const collection = [ 'hello', 'world' ]
      expect(collection).toContain(getRandomElement(collection))
    })

    it('should throw an error if collection is not an array', () => {
      expect(() => getRandomElement('Owlbear')).toThrow(Error('getRandomElement(): collection must be an instance of Array.'))
    })

    it('should throw an error if collection is an empty array', () => {
      expect(() => getRandomElement([])).toThrow(Error('getRandomElement(): collection cannot be an empty array.'))
    })
  })
})
