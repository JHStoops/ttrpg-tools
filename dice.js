function getRandomInteger(maxValue, minValue = 1) {
  if (minValue === maxValue) return minValue;
  if (maxValue < minValue) throw Error('getRandomInteger(): minValue must be less than maxValue.');
  return Math.floor(Math.random() * (maxValue + 1 - minValue) + minValue); // Return values minValue - maxValue
}

module.exports = {
  /**
   * @description Takes an object of dice types and counts to return the rolled results.
   * @param {Object} dice - an object with sidedness as key name, and diceCount as value.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  diceRoll(dice, verbose) {
    if (typeof dice !== 'object') throw Error('diceRoll(): dice parameter must be an Object.');
    const dieRolls = {};

    Object.entries(dice).forEach(([type, count]) => {
      const dieType = Number(type);
      if (typeof dieType !== 'number') throw Error('diceRoll(): dice key must be an integer instance of Number.');
      if (typeof count !== 'number') throw Error('diceRoll(): dice value must be an integer instance of Number.');

      // Start rollin'!
      dieRolls[type] = { rolls: Array(count).fill(0).map(() => getRandomInteger(dieType)) };
      const total = dieRolls[type].rolls.reduce((accumulatedValue, currentValue) => accumulatedValue + currentValue, 0);
      if (!verbose) dieRolls[type] = total;
      else dieRolls[type].total = total;
    });

    return dieRolls;
  },

  /**
   * @description Flip a coin.
   * @param {Number} coinFlip - How many coins to flip.
   * @param {Boolean} asNumeric - Whether to return numbers (0 and 1) instead of "Heads" and "Tails"
   */
  coin(coinFlips = 1, asNumeric = false) {
    if (typeof coinFlips !== 'number') throw Error('coin(): coinFlips must be a Number.');
    if (coinFlips < 1) throw Error('coin(): coinFlips must be greater or equal to 1.');

    const headsCount = Array(coinFlips).fill(0).reduce((acc) => acc + getRandomInteger(1, 0), 0);
    const tailsCount = coinFlips - headsCount;

    return asNumeric ? { 0: tailsCount, 1: headsCount } : { tails: tailsCount, heads: headsCount };
  },

  /**
   * @description Roll a number of d4.
   * @param {Number} dieCount - How many 4-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d4(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d4(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 4: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d6.
   * @param {Number} dieCount - How many 6-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d6(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d6(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 6: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d8.
   * @param {Number} dieCount - How many 8-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d8(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d8(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 8: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d10.
   * @param {Number} dieCount - How many 10-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d10(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d10(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 10: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d12.
   * @param {Number} dieCount - How many 12-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d12(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d12(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 12: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d20.
   * @param {Number} dieCount - How many 20-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d20(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d20(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 20: dieCount }, verbose);
  },

  /**
   * @description Roll a number of d100.
   * @param {Number} dieCount - How many 100-sided dice to roll.
   * @param {Boolean} verbose - Whether to return a detailed response. false only returns total; true returns results of each die with total.
   */
  d100(dieCount = 1, verbose = false) {
    if (typeof dieCount !== 'number') throw Error('d100(): dieCount must be a Number.');
    if (dieCount < 1) return 0;
    return this.diceRoll({ 100: dieCount }, verbose);
  },
};
