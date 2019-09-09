const createLabel = require('./index')
import mockContext from '../../tests/mockContext'

describe('createLabel', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      issues: {
        createLabel: jest.fn()
      }
    })
  })

  it('creates a label', async () => {
    await createLabel(context, { name: 'My label', color: 'f87000' })
    expect(context.github.issues.createLabel).toHaveBeenCalled()
    expect(context.github.issues.createLabel.mock.calls).toMatchSnapshot()
  })
})
