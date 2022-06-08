const dice = require('./generators/dice')
const npc = require('./generators/npc')
const towns = require('./generators/towns')

module.exports = {
  ...dice,
  ...npc,
  ...towns,
}
