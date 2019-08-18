const mergeBranch = require('./index')
const mockContext = require('../../tests/mockContext')

describe('mergeBranch', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      repos: {
        merge: jest.fn(() => Promise.resolve({ data: { number: 1 } }))
      }
    })
  })

  it('merges a branch into master', async () => {
    await mergeBranch(context, { head: 'branch' })
    expect(context.github.repos.merge).toHaveBeenCalled()
    expect(context.github.repos.merge.mock.calls).toMatchSnapshot()
  })

  it('merges a branch into the provided base', async () => {
    await mergeBranch(context, { head: 'branch', base: 'dev' })
    expect(context.github.repos.merge).toHaveBeenCalled()
    expect(context.github.repos.merge.mock.calls).toMatchSnapshot()
  })
})
