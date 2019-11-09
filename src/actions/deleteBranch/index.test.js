const nock = require('nock')
const { GitHubAPI } = require('probot/lib/github')
const deleteBranch = require('./')
const mockContext = require('../../tests/mockContext')

describe('deleteBranch', () => {
  let context, nocked

  beforeEach(() => {
    context = mockContext({}, new GitHubAPI())
    const { owner, repo } = context.repo()
    nocked = nock('https://api.github.com')
      .delete(`/repos/${owner}/${repo}/git/refs/heads/example-branch`)
      .reply(204)
  })

  it('deletes the expected branch', async () => {
    await deleteBranch(context, { branch: 'example-branch' })
    expect(nocked.isDone()).toBe(true)
  })
})
