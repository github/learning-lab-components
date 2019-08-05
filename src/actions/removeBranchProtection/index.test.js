const removeBranchProtection = require('.')
const mockContext = require('../../../tests/mockContext')

describe('removeBranchProtection', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      repos: { removeBranchProtection: jest.fn() }
    })
  })

  it('removes branch protection on master by default', async () => {
    await removeBranchProtection(context, {})
    expect(context.github.repos.removeBranchProtection).toHaveBeenCalled()
    expect(context.github.repos.removeBranchProtection.mock.calls).toMatchSnapshot()
  })

  it('removes branch protection on the provided branch', async () => {
    await removeBranchProtection(context, { branch: 'a-branch' })
    expect(context.github.repos.removeBranchProtection).toHaveBeenCalled()
    expect(context.github.repos.removeBranchProtection.mock.calls).toMatchSnapshot()
  })
})
