import ttrpgTools, {
  coin,
  data,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d100,
  diceRoll,
  generateNpc,
  generateNpcName,
  generateTown,
  generateTownName,
} from './index.js'

describe('exports', () => {
  it('should have default export present with all methods and data', () => {
    // Customize data exports
    expect(ttrpgTools.data).toBeInstanceOf(Object)

    // Dice exports
    expect(ttrpgTools.coin).toBeInstanceOf(Function)
    expect(ttrpgTools.d4).toBeInstanceOf(Function)
    expect(ttrpgTools.d6).toBeInstanceOf(Function)
    expect(ttrpgTools.d8).toBeInstanceOf(Function)
    expect(ttrpgTools.d10).toBeInstanceOf(Function)
    expect(ttrpgTools.d12).toBeInstanceOf(Function)
    expect(ttrpgTools.d20).toBeInstanceOf(Function)
    expect(ttrpgTools.d100).toBeInstanceOf(Function)
    expect(ttrpgTools.diceRoll).toBeInstanceOf(Function)

    // Name exports
    expect(ttrpgTools.generateNpcName).toBeInstanceOf(Function)
    expect(ttrpgTools.generateTownName).toBeInstanceOf(Function)

    // NPC exports
    expect(ttrpgTools.generateNpc).toBeInstanceOf(Function)

    // Town exports
    expect(ttrpgTools.generateTown).toBeInstanceOf(Function)
  })

  it('should have named exports present with all methods and data', () => {
    // Customize data exports
    expect(data).toBeInstanceOf(Object)

    // Dice exports
    expect(coin).toBeInstanceOf(Function)
    expect(d4).toBeInstanceOf(Function)
    expect(d6).toBeInstanceOf(Function)
    expect(d8).toBeInstanceOf(Function)
    expect(d10).toBeInstanceOf(Function)
    expect(d12).toBeInstanceOf(Function)
    expect(d20).toBeInstanceOf(Function)
    expect(d100).toBeInstanceOf(Function)
    expect(diceRoll).toBeInstanceOf(Function)

    // Name exports
    expect(generateNpcName).toBeInstanceOf(Function)
    expect(generateTownName).toBeInstanceOf(Function)

    // NPC exports
    expect(generateNpc).toBeInstanceOf(Function)

    // Town exports
    expect(generateTown).toBeInstanceOf(Function)
  })
})
