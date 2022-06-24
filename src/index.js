import * as dice from './generators/dice.js'
import * as names from './generators/names.js'
import * as npc from './generators/npc.js'
import * as towns from './generators/towns.js'

export default { ...dice, ...names, ...npc, ...towns }

export * from './generators/dice.js'
export * from './generators/names.js'
export * from './generators/npc.js'
export * from './generators/towns.js'
