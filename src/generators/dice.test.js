// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals'
import * as dice from './dice.js'

describe('dice', () => {
  it('should exist', () => {
    expect(dice.diceRoll).toBeInstanceOf(Function)
    expect(dice.coin).toBeInstanceOf(Function)
    expect(dice.d4).toBeInstanceOf(Function)
    expect(dice.d6).toBeInstanceOf(Function)
    expect(dice.d8).toBeInstanceOf(Function)
    expect(dice.d10).toBeInstanceOf(Function)
    expect(dice.d12).toBeInstanceOf(Function)
    expect(dice.d20).toBeInstanceOf(Function)
    expect(dice.d100).toBeInstanceOf(Function)
  })

  describe('coin', () => {
    it('should add up to coinFlips value that is passed in', () => {
      for (let i = 1; i <= 20; i++) {
        const flipResults = dice.coin(i)
        expect(flipResults.heads + flipResults.tails).toBe(i)
      }
    })

    it('should use `0` and `1` as keys instead of "heads" and "tails', () => {
      for (let i = 1; i <= 20; i++) {
        const flipResults = dice.coin(i, true)
        expect(flipResults['0'] + flipResults['1']).toBe(i)
      }
    })

    it('should use highest coin toss with advantage', () => {
      const maxSpy = jest.spyOn(Math, 'max')
      const withAdvantage = true
      const withDisadvantage = false
      dice.coin(1, false, withAdvantage, withDisadvantage)

      expect(maxSpy).toHaveBeenCalled()
    })

    it('should use lowest coin toss with disadvantage', () => {
      const minSpy = jest.spyOn(Math, 'min')
      const withAdvantage = false
      const withDisadvantage = true
      dice.coin(1, false, withAdvantage, withDisadvantage)

      expect(minSpy).toHaveBeenCalled()
    })

    it('should use first coin toss with both advantage and disadvantage', () => {
      const maxSpy = jest.spyOn(Math, 'max')
      const minSpy = jest.spyOn(Math, 'min')
      const withAdvantage = true
      const withDisadvantage = true
      dice.coin(1, false, withAdvantage, withDisadvantage)

      expect(maxSpy).not.toHaveBeenCalled()
      expect(minSpy).not.toHaveBeenCalled()
    })

    it('should throw error if coinFlips is not a Number', () => {
      expect(() => dice.coin('Owlbear')).toThrow(Error('coin(): coinFlips must be a Number.'))
    })

    it('should throw error if coinFlips less than 1', () => {
      expect(() => dice.coin(0)).toThrow(Error('coin(): coinFlips must be greater or equal to 1.'))
    })
  })

  describe('diceRoll', () => {
    it('should return rolls for all types provided', () => {
      for (let i = 1; i <= 20; i++) {
        const rollResults = dice.diceRoll({
          4: i, 6: i, 8: i, 10: i, 12: i, 20: i, 100: i,
        })
        Object.entries(rollResults).forEach(([ dieSides, value ]) => {
          expect(value).toBeGreaterThanOrEqual(i)
          expect(value).toBeLessThanOrEqual(dieSides * i)
        })
      }
    })

    it('should return array of individual rolls when verbose', () => {
      for (let i = 1; i <= 20; i++) {
        const rollResults = dice.diceRoll({
          4: i, 6: i, 8: i, 10: i, 12: i, 20: i, 100: i,
        }, true)

        Object.keys(rollResults).forEach((dieSides) => {
          expect(rollResults[dieSides].rolls).toHaveLength(i)
        })
      }
    })

    it('should add modifier to rolls', () => {
      expect(dice.diceRoll({ 1: 1 }, false, -5)).toEqual({ 1: -4 })
      expect(dice.diceRoll({ 1: 1 }, false, 3)).toEqual({ 1: 4 })
    })

    it('should use highest roll with advantage', () => {
      const maxSpy = jest.spyOn(Math, 'max')
      const withAdvantage = true
      const withDisadvantage = false
      dice.diceRoll({ 20: 1 }, false, 0, withAdvantage, withDisadvantage)

      expect(maxSpy).toHaveBeenCalled()
    })

    it('should use lowest roll with disadvantage', () => {
      const minSpy = jest.spyOn(Math, 'min')
      const withAdvantage = false
      const withDisadvantage = true
      dice.diceRoll({ 20: 1 }, false, 0, withAdvantage, withDisadvantage)

      expect(minSpy).toHaveBeenCalled()
    })

    it('should use first roll with both advantage and disadvantage', () => {
      const maxSpy = jest.spyOn(Math, 'max')
      const minSpy = jest.spyOn(Math, 'min')
      const withAdvantage = true
      const withDisadvantage = true
      dice.diceRoll({ 20: 1 }, false, 0, withAdvantage, withDisadvantage)

      expect(maxSpy).not.toHaveBeenCalled()
      expect(minSpy).not.toHaveBeenCalled()
    })

    it.todo('should roll with advantage')
    it.todo('should roll with disadvantage')

    it('should throw error if dice is not an Object', () => {
      expect(() => dice.diceRoll(1)).toThrow(Error('diceRoll(): dice parameter must be an Object.'))
    })

    it('should throw error if dieType is not a Number', () => {
      expect(() => dice.diceRoll({ Owlbear: 10 })).toThrow(Error('diceRoll(): dice key must be an integer instance of Number.'))
    })

    it('should throw error if dieCount is not a Number', () => {
      expect(() => dice.diceRoll({ 4: 'Owlbear' })).toThrow(Error('diceRoll(): dice value must be an integer instance of Number.'))
    })
  })

  const dieTypes = [ 4, 6, 8, 10, 12, 20, 100 ]
  dieTypes.forEach((dieSides) => {
    describe(`d${dieSides}`, () => {
      it(`should roll values between 1-${dieSides} inclusive`, () => {
        for (let i = 1; i <= 20; i++) {
          const rollResults = dice[`d${dieSides}`](i)
          expect(rollResults[dieSides]).toBeGreaterThanOrEqual(i)
          expect(rollResults[dieSides]).toBeLessThanOrEqual(dieSides * i)
        }
      })

      it('should return array of individual rolls when verbose', () => {
        for (let i = 1; i <= 20; i++) {
          const rollResults = dice[`d${dieSides}`](i, true)
          expect(rollResults[dieSides].rolls).toHaveLength(i)
        }
      })

      it('should throw error if dieCount is not a Number', () => {
        expect(() => dice[`d${dieSides}`]('Owlbear')).toThrow(Error(`d${dieSides}(): dieCount must be a Number.`))
      })

      it('should throw error if dieCount less than 1', () => {
        expect(() => dice[`d${dieSides}`](0)).toThrow(Error(`d${dieSides}(): dieCount must be greater or equal to 1.`))
      })
    })
  })
})
