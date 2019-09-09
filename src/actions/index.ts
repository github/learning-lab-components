import fs from 'fs';

import * as types from '../types';

const actionNames =
  fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(ent => ent.isDirectory())
    .map(ent => ent.name)
    .sort()

let actions: types.IAction = {};

for (const actionName of actionNames) {
  actions[actionName] = require(`./${actionName}`)
  actions[actionName].schema = require(`./${actionName}/schema`);
}

export default actions;
