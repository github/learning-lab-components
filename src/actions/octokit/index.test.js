const octokit = require('./')
const mockContext = require('../../tests/mockContext')

describe('octokit', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      issues: { create: jest.fn() }
    })
  })

  it('calls the correct octokit method', async () => {
    await octokit(context, { method: 'issues.create', title: 'test', body: 'test', owner: 'JasonEtco', repo: 'example' })
    expect(context.github.issues.create).toHaveBeenCalled()
    expect(context.github.issues.create.mock.calls).toMatchSnapshot()
  })

  it('throws if the provided method does not exist', async () => {
    try {
      await octokit(context, { method: 'issues.nope' })
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  })

  it('throws if the provided method is called without all the required parameters', async () => {
    try {
      // Omitting the `title` field
      await octokit(context, { method: 'issues.create', body: 'test' })
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  })
})
