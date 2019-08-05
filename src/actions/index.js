const fs = require('fs')

const actionNames =
  fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(ent => ent.isDirectory())
    .map(ent => ent.name)
    .sort()

const actions = {}

for (const actionName of actionNames) {
  actions[actionName] = require(`./${actionName}`)
  actions[actionName].schema = require(`./${actionName}/schema`)
}

module.exports = actions
