const createReview = require('./')
const mockContext = require('../../tests/mockContext')

describe('createReview', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        number: 1
      }
    }, {
      pullRequests: {
        createReview: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({
          data: {
            items: [{ title: 'My Pull Request', number: 3 }]
          }
        }))
      }
    })
  })

  it('creates a pull request review', async () => {
    await createReview(context, { event: 'APPROVED', body: 'a-body.md' })
    expect(context.github.pullRequests.createReview).toHaveBeenCalled()
    expect(context.github.pullRequests.createReview.mock.calls).toMatchSnapshot()
  })

  it('creates a pull request review with a number', async () => {
    await createReview(context, { event: 'APPROVED', body: 'a-body.md', number: 2 })
    expect(context.github.pullRequests.createReview).toHaveBeenCalled()
    expect(context.github.pullRequests.createReview.mock.calls).toMatchSnapshot()
  })

  it('creates a pull request review with pullRequest title field', async () => {
    await createReview(context, { event: 'APPROVED', body: 'a-body.md', pullRequest: 'My Pull Request' })
    expect(context.github.pullRequests.createReview).toHaveBeenCalled()
    expect(context.github.pullRequests.createReview.mock.calls).toMatchSnapshot()
  })

  it('creates a pull request review with pullRequest number field', async () => {
    await createReview(context, { event: 'APPROVED', body: 'a-body.md', pullRequest: 4 })
    expect(context.github.pullRequests.createReview).toHaveBeenCalled()
    expect(context.github.pullRequests.createReview.mock.calls).toMatchSnapshot()
  })

  it('uses the number when hardcoded', async () => {
    await createReview(context, { event: 'APPROVED', body: 'a-body.md', pullRequest: 'My Pull Request', number: 1000 })
    expect(context.github.pullRequests.createReview).toHaveBeenCalled()
    expect(context.github.pullRequests.createReview.mock.calls).toMatchSnapshot()
  })
})
