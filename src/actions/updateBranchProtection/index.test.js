const updateBranchProtection = require('./')
const mockContext = require('../../tests/mockContext')

describe('updateBranchProtection', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      repos: {
        updateBranchProtection: jest.fn()
      }
    })
  })

  it('updates branch protection on master by default', async () => {
    await updateBranchProtection(context, {})
    expect(context.github.repos.updateBranchProtection).toHaveBeenCalled()
    expect(context.github.repos.updateBranchProtection.mock.calls).toMatchSnapshot()
  })

  it('updates branch protection on the provided branch', async () => {
    await updateBranchProtection(context, { branch: 'a-branch' })
    expect(context.github.repos.updateBranchProtection).toHaveBeenCalled()
    expect(context.github.repos.updateBranchProtection.mock.calls).toMatchSnapshot()
  })
})
