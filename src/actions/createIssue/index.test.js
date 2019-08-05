const createIssue = require('.')
const mockContext = require('../../tests/mockContext')

describe('createIssue', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      issues: {
        create: jest.fn(() => Promise.resolve({ data: { number: 1 } })),
        createComment: jest.fn()
      }
    })
  })

  it('opens an issue', async () => {
    await createIssue(context, { title: 'My issue', body: 'a-body.md', data: { foo: true } })
    expect(context.github.issues.create).toHaveBeenCalled()
    expect(context.github.issues.create.mock.calls).toMatchSnapshot()

    // Ensures that data was passed
    expect(context.fromFile.mock.calls).toMatchSnapshot()
  })

  it('opens an issue with comments', async () => {
    await createIssue(context, { title: 'My issue', body: 'a-body.md', comments: ['a-comment.md', 'another-comment.md'], data: { foo: true } })
    expect(context.github.issues.create).toHaveBeenCalled()
    expect(context.github.issues.createComment).toHaveBeenCalledTimes(2)
    expect(context.github.issues.createComment.mock.calls).toMatchSnapshot()

    // Ensures that data was passed
    expect(context.fromFile.mock.calls).toMatchSnapshot()
  })
})
