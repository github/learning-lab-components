const respond = require('./')
const mockContext = require('../../tests/mockContext')

describe('respond', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      issue: {
        number: 1
      }
    }, {
      issues: {
        createComment: jest.fn()
      },
      search: {
        issues: jest.fn(() => Promise.resolve({ data: { items: [{ title: 'An issue title', number: 2 }] } }))
      }
    })
  })

  it('responds to the issue in the payload', async () => {
    await respond(context, { with: 'a body' })
    expect(context.github.issues.createComment).toHaveBeenCalled()
    expect(context.github.issues.createComment.mock.calls).toMatchSnapshot()
  })

  it('responds to the issue with the specified number', async () => {
    await respond(context, { with: 'a body', issue: 2 })
    expect(context.github.issues.createComment).toHaveBeenCalled()
    expect(context.github.issues.createComment.mock.calls).toMatchSnapshot()
  })

  it('responds to the issue with the specified title', async () => {
    await respond(context, { with: 'a body', issue: 'An issue title' })
    expect(context.github.issues.createComment).toHaveBeenCalled()
    expect(context.github.issues.createComment.mock.calls).toMatchSnapshot()
  })
})
