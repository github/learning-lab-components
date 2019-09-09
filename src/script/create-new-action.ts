import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { promisify } from 'util';
import { prompt } from 'enquirer';
import { URL } from 'url';

import * as types from '../types';

const writeFile: (
  path: string | number | Buffer | URL, 
  data: any, 
  options?: string | { 
    encoding?: string | null | undefined; 
    mode?: string | number | undefined; 
    flag?: string | undefined; 
  } | null | undefined
) => Promise<void> = promisify(fs.writeFile)

const mkdir: (path: fs.PathLike, options?: string | number | fs.MakeDirectoryOptions | null | undefined) => Promise<void> = promisify(fs.mkdir)

const camelCaseMatch: RegExp = /^[a-z]+[A-Za-z0-9]+$/

const isNotEmpty = (value: string): boolean => Boolean(value)
const isValidName = (value: string): boolean => isNotEmpty(value) && camelCaseMatch.test(value)

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
/**
 * Creates the contents string for "schema.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "schema.js" contents.
 */
const createSchema = ({ description }: Partial<types.IPromptAnswers>): string => {
  const schemaContents = `const Joi = require('@hapi/joi')
  const data = require('../../schemas/data')
  
  module.exports = Joi.object({
    data
  })
    .description('${ (<string>description).replace(/'/g, '\\\'')}')
    .example(
      []
    )  
`
  return schemaContents
}


/*
 const createIndex = ({ name }: types.IPromptAnswers) => {
  const indexContents = `export default async (context, opts) => {
  // TODO: test
};
`
  return indexContents
}
 */
/**
 * Creates the contents string for "index.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "index.js" contents.
 */
const createIndex = ({ name }: Partial<types.IPromptAnswers>): string => {
  const indexContents = `module.exports = async (context, opts) => {
    // TODO: ${name}
  }
`
  return indexContents
}


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
/**
 * Creates the contents string for "index.test.js",
 * replacing variables in the template with values passed
 * in by the user from the CLI prompt.
 *
 * @param {PromptAnswers} answers - The CLI prompt answers.
 * @returns {string} The "index.test.js" contents.
 */
const createTest = ({ name }: Partial<types.IPromptAnswers>): string => {
  const testContents = `const ${name} = require('./')
  import mockContext from '../../tests/mockContext'
  
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
const createAction = async (): Promise<void> => {
  // Collect answers
  const action: types.IPromptAnswers = await getActionMetadata()

  const baseDir: string = path.join(__dirname, `../actions/${action.name}`)
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
  const schema: string = createSchema(action)
  const index: string = createIndex(action)
  const test: string = createTest(action)

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
