const createProjectBoard = require('./')
const mockContext = require('../../tests/mockContext')

describe('createProjectBoard', () => {
  let context

  beforeEach(() => {
    context = mockContext({}, {
      projects: {
        createRepoProject: jest.fn(() => Promise.resolve({ data: { id: 1 } })),
        createProjectColumn: jest.fn()
      }
    })
  })

  it('creates a new project board', async () => {
    await createProjectBoard(context, { name: 'My project board', description: 'Something clever' })
    expect(context.github.projects.createRepoProject).toHaveBeenCalled()
    expect(context.github.projects.createRepoProject.mock.calls).toMatchSnapshot()
  })

  it('creates a new project board with columns', async () => {
    await createProjectBoard(context, { name: 'My project board', description: 'Something clever', columns: ['To do', 'In progress', 'Done like dinner'] })
    expect(context.github.projects.createRepoProject).toHaveBeenCalled()
    expect(context.github.projects.createProjectColumn).toHaveBeenCalledTimes(3)
    expect(context.github.projects.createProjectColumn.mock.calls).toMatchSnapshot()
  })
})
