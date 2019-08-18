import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { promisify } from 'util';
import { prompt } from 'enquirer';

import * as types from '../types';

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

const camelCaseMatch = /^[a-z]+[A-Za-z0-9]+$/

const isNotEmpty = (value: string) => Boolean(value)
const isValidName = (value: string) => isNotEmpty(value) && camelCaseMatch.test(value)

/**
 * The options object returned from the CLI questionnaire prompt.
 * @typedef {object} PromptAnswers
 * @property {string} name - The action name.
 * @property {string} description - The action description.
 */

/**
 * Prompts the user with a questionnaire to get key metadata for the GitHub Action.
 * @returns {Promise<PromptAnswers>} An object containing prompt answers.
 */
const getActionMetadata = async () : Promise<types.IPromptAnswers> => {
  return prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your action?',
      initial: 'createIssue',
      validate: isValidName
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is a short description of your action?',
      initial: 'Creates a new issue on GitHub.',
      validate: isNotEmpty
    }
  ])
}

/**
 * Creates the contents string for "schema.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "schema.js" contents.
 */

 /* 
 const createSchema = ({ name, description }: types.IPromptAnswers) => {
  const schemaContents = `import Joi from '@hapi/joi';
import data from '../../schemas/data';

export default Joi.object({
  data
})
  .description('${
    // @ts-ignore
    description.replace(/'/g, '\\\'')}')
  .example(
    []
  )
`
  return schemaContents
}
 */


const createSchema = ({ name, description }: types.IPromptAnswers) => {
  const schemaContents = `const Joi = require('@hapi/joi')
  const data = require('../../schemas/data')
  
  module.exports = Joi.object({
    data
  })
    .description('${
      //@ts-ignore
      description.replace(/'/g, '\\\'')}')
    .example(
      []
    )  
`
  return schemaContents
}

/**
 * Creates the contents string for "index.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "index.js" contents.
 */

 /*
 const createIndex = ({ name }: types.IPromptAnswers) => {
  const indexContents = `export default async (context, opts) => {
  // TODO: test
};
`
  return indexContents
}
 */

const createIndex = ({ name }: types.IPromptAnswers) => {
  const indexContents = `module.exports = async (context, opts) => {
    // TODO: ${name}
  }
`
  return indexContents
}

/**
 * Creates the contents string for "index.test.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "index.test.js" contents.
 */

 /*
 const createTest = ({ name }: types.IPromptAnswers) => {
  const testContents = `import ${name} from '.';
import mockContext from '../../tests/mockContext';

describe('${name}', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {})
  })

  it('fails until real tests are added', async () => {
    expect(true).toBe(false)

    // await ${name}(context, {})
  })
})
`
  return testContents
}
 */

const createTest = ({ name }: types.IPromptAnswers) => {
  const testContents = `const ${name} = require('./')
  const mockContext = require('../../tests/mockContext')
  
  describe('${name}', () => {
    let context
  
    beforeEach(() => {
      context = mockContext({}, {})
    })
  
    it('fails until real tests are added', async () => {
      expect(true).toBe(false)
  
      // await ${name}(context, {})
    })
  })
`
  return testContents
}

/**
 * Runs the create action CLI prompt and bootstraps a new directory for the user.
 *
 * @public
 * @returns {Promise<void>} Nothing.
 */
const createAction = async () => {
  // Collect answers
  const action = await getActionMetadata()

  const baseDir = path.join(__dirname, `../actions/${action.name}`)
  try {
    console.info(`Creating new action directory "${baseDir}"...`)
    await mkdir(baseDir)
  } catch (err) {
    if (err.code === 'EXIST') {
      console.error(`Directory already exists: "${baseDir}"`)
      process.exit(1)
    }
    throw err
  }

  // Create the templated content
  const schema = createSchema(action)
  const index = createIndex(action)
  const test = createTest(action)

  await Promise.all(
    [
      ['schema.js', schema],
      ['index.js', index],
      ['index.test.js', test]
    ]
      .map(async ([filename, contents]) => {
        console.info(`Creating "${filename}"...`)
        await writeFile(path.join(baseDir, filename), contents)
      })
  )

  console.info('Creating "README.md"...')
  console.log(process.execPath, path.join(__dirname, 'generate-action-docs.js'))
  const { status, signal, error } =
    spawnSync(
      process.execPath,
      [
        path.join(__dirname, 'generate-action-docs.js')
      ]
    )

  if (status !== 0) {
    console.error(`Failed to generate README.md!
Exited with status ${status}, signal ${signal}, error:
${error}`
    )
    process.exit(1)
  }

  console.info(`
------------------------------------
Done. You are ready to start writing your new action!
`)
}

// Execute!
createAction()
