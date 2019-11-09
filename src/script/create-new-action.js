const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { promisify } = require('util')
const { prompt } = require('enquirer')

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

const camelCaseMatch = /^[a-z]+[A-Za-z0-9]+$/

const isNotEmpty = value => Boolean(value)
const isValidName = value => isNotEmpty(value) && camelCaseMatch.test(value)

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
async function getActionMetadata () {
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
function createSchema ({ name, description }) {
  const schemaContents = `const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  data
})
  .description('${description.replace(/'/g, '\\\'')}')
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
function createIndex ({ name }) {
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
function createTest ({ name }) {
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
async function createAction () {
  // Collect answers
  const action = await getActionMetadata()

  const baseDir = path.join(__dirname, '..', 'actions', action.name)
  try {
    console.info(`Creating new action directory "${baseDir}"...`)
    await mkdir(baseDir)
  } catch (err) {
    if (err.code === 'EEXIST') {
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
${error.stack}`
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
