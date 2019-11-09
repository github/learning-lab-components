const getIssue = require('./')
const mockContext = require('../../tests/mockContext')

describe('getIssue', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      issue: {
        number: 1
      }
    }, {
      issues: {
        get: jest.fn(() => Promise.resolve({ data: { number: 1 } }))
      },
      search: {
        issues: jest.fn(() => Promise.resolve({
          data: {
            items: [{ title: 'My issue', number: 1 }]
          }
        }))
      }
    })
  })

  it('gets an issue', async () => {
    const issue = await getIssue(context, {})
    expect(issue).toMatchSnapshot()
  })

  it('gets an issue with a title string', async () => {
    const issue = await getIssue(context, { issue: 'My issue' })
    expect(issue).toMatchSnapshot()
  })

  it('gets an issue with a issue number', async () => {
    const issue = await getIssue(context, { issue: 1 })
    expect(issue).toMatchSnapshot()
  })
})
