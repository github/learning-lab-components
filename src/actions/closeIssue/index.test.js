const closeIssue = require('./')
const mockContext = require('../../tests/mockContext')

describe('closeIssue', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      issue: {
        number: 1
      }
    }, {
      issues: {
        update: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({
          data: {
            items: [{ title: 'My issue', number: 2 }]
          }
        }))
      }
    })
  })

  it('closes the issue from the webhook payload', async () => {
    await closeIssue(context, {})
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('closes an issue with an issue string', async () => {
    await closeIssue(context, { issue: 'My issue' })
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('closes an issue with an issue number', async () => {
    await closeIssue(context, { issue: 2 })
    expect(context.github.issues.update).toHaveBeenCalled()
    expect(context.github.issues.update.mock.calls).toMatchSnapshot()
  })

  it('throws an error if the issue cannot be found', async () => {
    try {
      await closeIssue(context, { issue: 'My issue' })
    } catch (err) {
      expect(err).toMatchSnapshot()
    }
  })
})
