const has = require('has')

module.exports = async (context, opts) => {
  let number, sha
  if (has(opts, 'pullRequest')) {
    if (typeof opts.pullRequest === 'string') {
      const { owner, repo } = context.repo()
      const pullRequests = await context.github.search.issues({
        q: `in:title is:pr ${opts.pullRequest} repo:${owner}/${repo}`
      })
      const pullRequest = pullRequests.data.items.find(i => i.title === opts.pullRequest)
      number = pullRequest.number
      sha = pullRequest.head.sha
    } else if (typeof opts.pullRequest === 'number') {
      number = opts.pullRequest
      // Get the sha of the head of the PR
      const pr = await context.github.pullRequests.get(context.repo({ number }))
      sha = pr.data.head.sha
    }
  } else {
    number = (context.payload.pull_request || context.payload).number
  }

  const params = context.repo({
    number,
    body: await context.fromFile(opts.body, opts.data),
    path: opts.file,
    position: opts.position,
    commit_id: sha || context.payload.pull_request.head.sha
  })

  return context.github.pullRequests.createComment(params)
}
