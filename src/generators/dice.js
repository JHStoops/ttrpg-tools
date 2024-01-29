import { getRandomInteger } from '../lib/utils.js'

/**
 * @description Takes an object of dice types and counts to return the rolled results.
 * @param {Object} dice - an object with sidedness as key name, and diceCount as value.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to toss coin with advantage.
 * @param {Boolean} withDisadvantage - Whether to toss coin with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function diceRoll(dice, verbose, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dice !== 'object') throw Error('diceRoll(): dice parameter must be an Object.')
  const dieRolls = {}

  Object.entries(dice).forEach(([ type, count ]) => {
    const dieType = Number(type)
    if (Number.isNaN(dieType)) throw Error('diceRoll(): dice key must be an integer instance of Number.')
    if (typeof count !== 'number') throw Error('diceRoll(): dice value must be an integer instance of Number.')

    // Start rollin'!
    dieRolls[type] = {
      rolls: Array(count).fill(0).map(() => {
        const roll1 = getRandomInteger(dieType) + modifier
        const roll2 = getRandomInteger(dieType) + modifier
        if (withAdvantage && withDisadvantage) return roll1
        if (withAdvantage) return Math.max(roll1, roll2)
        if (withDisadvantage) return Math.min(roll1, roll2)
        return roll1
      }),
    }
    const total = dieRolls[type].rolls.reduce((accumulatedValue, currentValue) => accumulatedValue + currentValue, 0)
    if (!verbose) dieRolls[type] = total
    else dieRolls[type].total = total
  })

  return dieRolls
}

/**
 * @description Flip a coin.
 * @param {Number} coinFlips - How many coins to flip.
 * @param {Boolean} asNumeric - Whether to return numbers (0 and 1) instead of "Heads" and "Tails"
 * @param {Boolean} withAdvantage - Whether to toss coin with advantage.
 * @param {Boolean} withDisadvantage - Whether to toss coin with disadvantage.
 * @returns {Object} object with counts per side of the coin and their totals. If `asNumeric`, changes "heads" and "tails" object keys with `1` and `0` respectively.
 */
export function coin(coinFlips = 1, asNumeric = false, withAdvantage = false, withDisadvantage = false) {
  if (typeof coinFlips !== 'number') throw Error('coin(): coinFlips must be a Number.')
  if (coinFlips < 1) throw Error('coin(): coinFlips must be greater or equal to 1.')

  const headsCount = Array(coinFlips).fill(0).reduce((acc) => {
    const toss1 = getRandomInteger(1, 0)
    const toss2 = getRandomInteger(1, 0)
    if (withAdvantage && withDisadvantage) return acc + toss1
    if (withAdvantage) return acc + Math.max(toss1, toss2)
    if (withDisadvantage) return acc + Math.min(toss1, toss2)
    return acc + toss1
  }, 0)
  const tailsCount = coinFlips - headsCount

  return asNumeric ? { 0: tailsCount, 1: headsCount } : { tails: tailsCount, heads: headsCount }
}

/**
 * @description Roll a number of d4.
 * @param {Number} dieCount - How many 4-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d4(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d4(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d4(): dieCount must be greater or equal to 1.')
  return diceRoll({ 4: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d6.
 * @param {Number} dieCount - How many 6-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d6(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d6(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d6(): dieCount must be greater or equal to 1.')
  return diceRoll({ 6: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d8.
 * @param {Number} dieCount - How many 8-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d8(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d8(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d8(): dieCount must be greater or equal to 1.')
  return diceRoll({ 8: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d10.
 * @param {Number} dieCount - How many 10-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d10(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d10(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d10(): dieCount must be greater or equal to 1.')
  return diceRoll({ 10: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d12.
 * @param {Number} dieCount - How many 12-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d12(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d12(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d12(): dieCount must be greater or equal to 1.')
  return diceRoll({ 12: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d20.
 * @param {Number} dieCount - How many 20-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d20(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d20(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d20(): dieCount must be greater or equal to 1.')
  return diceRoll({ 20: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}

/**
 * @description Roll a number of d100.
 * @param {Number} dieCount - How many 100-sided dice to roll.
 * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
 * @param {Number} modifier - Add modifier to roll.
 * @param {Boolean} withAdvantage - Whether to roll with advantage.
 * @param {Boolean} withDisadvantage - Whether to roll with disadvantage.
 * @returns {Object} object with counts per type of die and their totals. If verbose, also returns an array with individual roll results per die type.
 */
export function d100(dieCount = 1, verbose = false, modifier = 0, withAdvantage = false, withDisadvantage = false) {
  if (typeof dieCount !== 'number') throw Error('d100(): dieCount must be a Number.')
  if (dieCount < 1) throw Error('d100(): dieCount must be greater or equal to 1.')
  return diceRoll({ 100: dieCount }, verbose, modifier, withAdvantage, withDisadvantage)
}
