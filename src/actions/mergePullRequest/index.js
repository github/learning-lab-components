const has = require('has')

module.exports = async (context, opts) => {
  let number
  if (has(opts, 'pullRequest')) {
    if (typeof opts.pullRequest === 'string') {
      const { owner, repo } = context.repo()
      const prs = await context.github.search.issues({
        q: `is:pr in:title ${opts.pullRequest} repo:${owner}/${repo}`
      })
      const pr = prs.data.items.find(i => i.title === opts.pullRequest)
      number = pr.number
    } else {
      number = opts.pullRequest
    }

    if (!number) throw new Error('Pull Request could not be found')
  } else {
    number = (context.payload.pull_request || context.payload).number
  }

  return context.github.pullRequests.merge(context.repo({ number }))
}
