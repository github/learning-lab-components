const getTree = require('./')
const mockContext = require('../../tests/mockContext')

describe('getTree', () => {
  let context

  beforeEach(() => {
    context = mockContext({},
      {
        gitdata: {
          getRef: jest.fn(() => Promise.resolve({ data: { object: { sha: 1 } } })),
          getTree: jest.fn()
        }
      }
    )
  })

  it('calls github.gitdata.getTree', async () => {
    await getTree(context, {})
    expect(context.github.gitdata.getRef).toHaveBeenCalled()
    expect(context.github.gitdata.getTree).toHaveBeenCalled()
    expect(context.github.gitdata.getTree.mock.calls).toMatchSnapshot()
  })

  it('calls github.gitdata.getTree with recursive', async () => {
    await getTree(context, { recursive: true })
    expect(context.github.gitdata.getTree).toHaveBeenCalled()
    expect(context.github.gitdata.getTree.mock.calls).toMatchSnapshot()
  })

  it('calls github.gitdata.getTree with a custom sha', async () => {
    await getTree(context, { sha: 123 })
    expect(context.github.gitdata.getRef).not.toHaveBeenCalled()
    expect(context.github.gitdata.getTree).toHaveBeenCalled()
    expect(context.github.gitdata.getTree.mock.calls).toMatchSnapshot()
  })
})
