const createPullRequest = require('./')
const mockContext = require('../../tests/mockContext')

describe('createPullRequest', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      pullRequests: {
        create: jest.fn(() => Promise.resolve({ data: { number: 1 } }))
      },
      issues: {
        createComment: jest.fn()
      }
    })
  })

  it('opens a pull request', async () => {
    await createPullRequest(context, { title: 'My pull request', body: 'a-body.md', head: 'branch' })
    expect(context.github.pullRequests.create).toHaveBeenCalled()
    expect(context.github.pullRequests.create.mock.calls).toMatchSnapshot()
  })

  it('opens a pull request with comments', async () => {
    await createPullRequest(context, { title: 'My pull request', body: 'a-body.md', head: 'branch', comments: ['a-comment.md', 'another-comment.md'] })
    expect(context.github.pullRequests.create).toHaveBeenCalled()
    expect(context.github.issues.createComment).toHaveBeenCalledTimes(2)
    expect(context.github.issues.createComment.mock.calls).toMatchSnapshot()
  })
})
