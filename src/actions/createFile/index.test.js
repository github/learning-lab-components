const createFile = require('./')
const mockContext = require('../../tests/mockContext')

describe('createFile', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        head: {
          sha: 123
        }
      }
    }, {
      repos: {
        createFile: jest.fn()
      }
    })
  })

  it('creates a new file', async () => {
    context.fromFile = () => Promise.resolve('Hello!')
    await createFile(context, { filename: 'filename' })
    expect(context.github.repos.createFile.mock.calls).toMatchSnapshot()
  })

  it('replaces file contents with context variables', async () => {
    await createFile(context, {
      filename: 'filename',
      content: 'Hello {{ login }}!',
      branch: 'a-feature-branch',
      data: {
        login: 'Jason'
      }
    })

    expect(context.github.repos.createFile.mock.calls).toMatchSnapshot()
  })

  it('can choose a new filename', async () => {
    await createFile(context, { filename: 'filename', new_name: 'CODEOWNERS' })
    expect(context.github.repos.createFile.mock.calls).toMatchSnapshot()
  })

  it('can set a custom commit message', async () => {
    await createFile(context, { filename: 'filename', message: 'Hello!' })
    expect(context.github.repos.createFile.mock.calls[0][0].message).toBe('Hello!')
  })

  it('creates a new file on the given branch', async () => {
    context.fromFile = () => Promise.resolve('Hello!')
    await createFile(context, { filename: 'filename', branch: 'a-feature-branch' })
    expect(context.github.repos.createFile.mock.calls).toMatchSnapshot()
  })
})
