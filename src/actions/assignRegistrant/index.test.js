const assignRegistrant = require('./')
const mockContext = require('../../tests/mockContext')

describe('assignRegistrant', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      issue: {
        number: 1
      }
    }, {
      request: jest.fn(),
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
    await assignRegistrant(context, {})
    expect(context.github.request).toHaveBeenCalled()
    expect(context.github.request.mock.calls).toMatchSnapshot()
  })

  it('closes an issue with an issue string', async () => {
    await assignRegistrant(context, { issue: 'My issue' })
    expect(context.github.request).toHaveBeenCalled()
    expect(context.github.request.mock.calls).toMatchSnapshot()
  })

  it('closes an issue with an issue number', async () => {
    await assignRegistrant(context, { issue: 2 })
    expect(context.github.request).toHaveBeenCalled()
    expect(context.github.request.mock.calls).toMatchSnapshot()
  })

  it('throws an error if the issue cannot be found', async () => {
    try {
      await assignRegistrant(context, { issue: 'My issue' })
    } catch (err) {
      expect(err).toMatchSnapshot()
    }
  })
})
