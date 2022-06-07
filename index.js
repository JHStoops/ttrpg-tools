const dice = require('./dice')
const npc = require('./npc')
const towns = require('./towns')

module.exports = {
  ...dice,
  ...npc,
  ...towns,
}
