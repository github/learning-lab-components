const has = require('has')

module.exports = async (context, opts) => {
  let number
  if (has(opts, 'number')) {
    number = opts.number
  } else if (has(opts, 'pullRequest')) {
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
  } else {
    number = context.issue().number
  }

  return context.github.pullRequests.createReview(context.repo({
    number,
    body: await context.fromFile(opts.body, opts.data),
    event: opts.event
  }))
}
