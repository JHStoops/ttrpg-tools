import * as dice from './generators/dice.js'
import * as npcNames from './generators/names/npcNames.js'
import * as townNames from './generators/names/townNames.js'
import * as npc from './generators/npc.js'
import * as towns from './generators/towns.js'

export default { ...dice, ...npc, ...npcNames, ...towns, ...townNames }

export * from './generators/dice.js'
export * from './generators/names/npcNames.js'
export * from './generators/names/townNames.js'
export * from './generators/npc.js'
export * from './generators/towns.js'
