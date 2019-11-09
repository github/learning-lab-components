const getPullRequest = require('./')
const mockContext = require('../../tests/mockContext')

describe('getPullRequest', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        number: 1
      }
    }, {
      pullRequests: {
        get: jest.fn(() => Promise.resolve({ data: { number: 1 } }))
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

  it('gets a pull request', async () => {
    const pr = await getPullRequest(context, {})
    expect(pr).toMatchSnapshot()
  })

  it('gets a pull request with a title string', async () => {
    const pr = await getPullRequest(context, { pullRequest: 'My Pull Request' })
    expect(pr).toMatchSnapshot()
  })

  it('gets a pull request with a pr number', async () => {
    const pr = await getPullRequest(context, { pullRequest: 1 })
    expect(pr).toMatchSnapshot()
  })
})
