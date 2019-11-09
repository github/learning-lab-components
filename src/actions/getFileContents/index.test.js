const getFileContents = require('./')
const mockContext = require('../../tests/mockContext')

describe('getFileContents', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        head: {
          sha: 123
        }
      }
    }, {
      gitdata: {
        getTree: jest.fn(() => Promise.resolve({ data: { tree: [{ path: 'filename', sha: 123 }] } })),
        getBlob: jest.fn(() => Promise.resolve({ data: { content: Buffer.from('this is a blob').toString('base64') } }))
      }
    })
  })

  it('gets the file contents of a given file', async () => {
    const ret = await getFileContents(context, { filename: 'filename' })
    expect(ret).toMatchSnapshot()
  })

  it('gets the file contents of a given file at a given sha', async () => {
    const ret = await getFileContents(context, { filename: 'filename', sha: 456 })
    expect(context.github.gitdata.getTree.mock.calls).toMatchSnapshot()
    expect(ret).toMatchSnapshot()
  })

  it('returns false if the content does not exist', async () => {
    context.github.gitdata.getBlob.mockImplementationOnce(() => { throw new Error(404) })
    const ret = await getFileContents(context, { filename: 'filename' })
    expect(ret).toBe(false)
  })
})
