import fs from 'fs';

import * as types from '../types';

const actionNames: Array<string> =
  fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(ent => ent.isDirectory())
    .map(ent => ent.name)
    .sort()

const actions: types.IActions = {}

for (const actionName of actionNames) {
  actions[actionName] = require(`./${actionName}`)
  actions[actionName].schema = require(`./${actionName}/schema`)
}

export { actions }; 
