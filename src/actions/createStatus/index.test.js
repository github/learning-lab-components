const createStatus = require('./')
const mockContext = require('../../tests/mockContext')

describe('createStatus', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        body: 'This here is a body',
        head: { sha: 123 }
      }
    }, {
      repos: {
        createStatus: jest.fn()
      }
    })
  })

  it('creates a status', async () => {
    await createStatus(context, { state: 'pending' })
    expect(context.github.repos.createStatus).toHaveBeenCalled()
    expect(context.github.repos.createStatus.mock.calls).toMatchSnapshot()
  })

  it('creates a status with expected state', async () => {
    await createStatus(context, { state: 'success' })
    expect(context.github.repos.createStatus).toHaveBeenCalled()
    expect(context.github.repos.createStatus.mock.calls).toMatchSnapshot()
  })

  it('creates a status with a gate-ish string', async () => {
    await createStatus(context, { state: '%payload.pull_request.body%' })
    expect(context.github.repos.createStatus).toHaveBeenCalled()
    expect(context.github.repos.createStatus.mock.calls).toMatchSnapshot()
  })

  it('creates a status with a sub-object', async () => {
    context.payload.pull_request.body = ''
    await createStatus(context, { state: '%payload.pull_request.body%', failure: { description: 'Your status' } })
    expect(context.github.repos.createStatus).toHaveBeenCalled()
    expect(context.github.repos.createStatus.mock.calls).toMatchSnapshot()
  })
})
