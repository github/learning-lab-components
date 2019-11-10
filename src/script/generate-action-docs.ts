import { actions } from '../index';
import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';

import * as types from '../types';

const template = ({ key, description, rows, examples }: any) => `<!--
  /!\\ WARNING /!\\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# \`${key}\`

${description}

${examples}

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
${rows}
`

/**
 * Convert a list of children properties into table rows.
 */
const mapChildrenToRows = (children: types.IKeys): string => {
  return Object.keys(children).reduce((prev, key) => {
    const opt = children[key]
    const cells = [
      // Label
      opt.metas && opt.metas[0] && opt.metas[0].label,
      // Property
      `\`${key}\``,
      // Description
      opt.flags && opt.flags.description ? opt.flags.description : '',
      // Default value
      opt.flags && opt.flags.default ? `\`${opt.flags.default}\`` : '',
      // Required
      opt.flags && opt.flags.presence === 'required' ? '✔' : ''
    ]
    return prev + `| ${cells.join(' | ')} |\n`
  }, '')
}

/**
 * Convert Joi example objects into strings:
 *
 *  {{ context }}
 *  ```yaml
 *  {{ yaml }}
 *  ```
 */
const mapExamples = (examples: types.Examples, key: string) => {
  const blocks = examples
    .map( obj => {
      const [value, options] = obj

      // Add the `type` property, because including it in the example wouldn't be valid for the schema
      const yaml = jsYaml.safeDump({ type: key, ...value })
      // Include the context if it exists
      const prefix = options && options.context ? `${options.context}\n\n` : ''
      return `${prefix}\`\`\`yaml\n${yaml}\`\`\``
    })
    .join('\n\n')
  return `## Examples\n\n${blocks}`
}

/**
 * Return a string to use as the file contents for the generated README.md
 */
const generate = (actionKey: string): string => {
  
  const schema = actions[actionKey].schema.describe()
  const rows: string = mapChildrenToRows(schema.keys)
  const examples = schema.examples ? mapExamples(schema.examples, actionKey) : ''

  return template({
    key: actionKey,
    description: schema.flags.description || '',
    rows,
    examples
  })
}

// Loop over each action to generate it's README.md
for (const actionKey in actions) {
  const pathToDoc: string = path.join(__dirname, '..', 'actions', actionKey, 'README.md')
  const body: string = generate(actionKey)
  fs.writeFileSync(pathToDoc, body)
}

/**
 * Update the table of contents, the list of actions,
 * in `/actions/README.md`.
 */
const updateTableOfContents = (): void => {
  const START_ACTIONS_LIST: string = '<!-- START_ACTIONS_LIST -->'
  const END_ACTIONS_LIST: string = '<!-- END_ACTIONS_LIST -->'
  const tocReg: RegExp = new RegExp(START_ACTIONS_LIST + '[\\s\\S]+' + END_ACTIONS_LIST)

  const readmePath: string = path.join(__dirname, '..', 'actions', 'README.md')
  const list: string = Object.keys(actions).reduce((prev, dir) => `${prev}- [${dir}](./${dir})\n`, '')
  const readme: string = fs.readFileSync(readmePath, 'utf8')
  const newReadme: string = readme.replace(tocReg, `${START_ACTIONS_LIST}\n${list}\n${END_ACTIONS_LIST}`)
  return fs.writeFileSync(readmePath, newReadme)
}

updateTableOfContents()
