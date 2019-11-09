const requestReviewFromRegistrant = require('./')
const mockContext = require('../../tests/mockContext')

describe('requestReviewFromRegistrant', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        number: 1
      }
    }, {
      pullRequests: {
        createReviewRequest: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({ data: { items: [{ title: 'A pr title', number: 2 }] } }))
      }
    })
  })

  it('requests a review on the PR in the payload', async () => {
    await requestReviewFromRegistrant(context, {})
    expect(context.github.pullRequests.createReviewRequest).toHaveBeenCalled()
    expect(context.github.pullRequests.createReviewRequest.mock.calls).toMatchSnapshot()
  })

  it('requests a review on the PR with the specified number', async () => {
    await requestReviewFromRegistrant(context, { pullRequest: 2 })
    expect(context.github.pullRequests.createReviewRequest).toHaveBeenCalled()
    expect(context.github.pullRequests.createReviewRequest.mock.calls).toMatchSnapshot()
  })

  it('requests a review on the PR with the specified title', async () => {
    await requestReviewFromRegistrant(context, { pullRequest: 'A pr title' })
    expect(context.github.pullRequests.createReviewRequest).toHaveBeenCalled()
    expect(context.github.pullRequests.createReviewRequest.mock.calls).toMatchSnapshot()
  })
})
