const mergePullRequest = require('./')
const mockContext = require('../../tests/mockContext')

describe('mergePullRequest', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        number: 1
      }
    }, {
      pullRequests: {
        merge: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({
          data: {
            items: [{ title: 'My Pull Request', number: 1 }]
          }
        }))
      }
    })
  })

  it('merges a pull request', async () => {
    await mergePullRequest(context, {})
    expect(context.github.pullRequests.merge).toHaveBeenCalled()
    expect(context.github.pullRequests.merge.mock.calls).toMatchSnapshot()
  })

  it('merges a pull request with a title string', async () => {
    await mergePullRequest(context, { pullRequest: 'My Pull Request' })
    expect(context.github.pullRequests.merge).toHaveBeenCalled()
    expect(context.github.pullRequests.merge.mock.calls).toMatchSnapshot()
  })

  it('merges a pull request with a pr number', async () => {
    await mergePullRequest(context, { pullRequest: 1 })
    expect(context.github.pullRequests.merge).toHaveBeenCalled()
    expect(context.github.pullRequests.merge.mock.calls).toMatchSnapshot()
  })
})
