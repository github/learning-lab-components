const nock = require('nock')
const { GitHubAPI } = require('probot/lib/github')
const createPullRequestComment = require('./')
const mockContext = require('../../tests/mockContext')

describe('createPullRequestComment', () => {
  let context, nocked

  beforeEach(() => {
    context = mockContext({
      pull_request: {
        number: 1,
        head: { sha: '123abc' }
      }
    }, new GitHubAPI())

    const { owner, repo } = context.repo()
    const reg = new RegExp(`/repos/${owner}/${repo}/pulls/\\d+/comments`)
    nocked = nock('https://api.github.com')
      .post(reg)
      .reply(201, (url, opts) => ({ url, opts }))
  })

  it('creates a PR comment on the PR in the payload', async () => {
    const { data } = await createPullRequestComment(context, {
      body: 'example.md',
      position: 1,
      file: 'some-file.js'
    })

    expect(data.url).toBe('/repos/JasonEtco/example/pulls/1/comments')
    expect(data.opts).toEqual({
      body: 'example.md',
      path: 'some-file.js',
      position: 1,
      commit_id: '123abc'
    })
    expect(nocked.isDone()).toBe(true)
  })

  it('creates a PR comment on the specified PR number', async () => {
    nocked
      .get('/repos/JasonEtco/example/pulls/4')
      .reply(200, { head: { sha: 'the1best2sha' } })

    const { data } = await createPullRequestComment(context, {
      body: 'example.md',
      pullRequest: 4,
      position: 1,
      file: 'some-file.js'
    })

    expect(data.url).toBe('/repos/JasonEtco/example/pulls/4/comments')
    expect(data.opts).toEqual({
      body: 'example.md',
      path: 'some-file.js',
      position: 1,
      commit_id: 'the1best2sha'
    })
    expect(nocked.isDone()).toBe(true)
  })

  it('creates a PR comment on the specified PR title', async () => {
    nocked
      .get(/\/search\/issues\?q=.*/)
      .reply(200, { items: [{ title: 'Some PR', number: 4, head: { sha: '324bca' } }] })

    const { data } = await createPullRequestComment(context, {
      body: 'example.md',
      pullRequest: 'Some PR',
      position: 1,
      file: 'some-file.js'
    })

    expect(data.url).toBe('/repos/JasonEtco/example/pulls/4/comments')
    expect(data.opts).toEqual({
      body: 'example.md',
      path: 'some-file.js',
      position: 1,
      commit_id: '324bca'
    })
    expect(nocked.isDone()).toBe(true)
  })
})
