const has = require('has')

module.exports = async (context, opts) => {
  let number
  if (has(opts, 'issue')) {
    if (typeof opts.issue === 'string') {
      const { owner, repo } = context.repo()
      const issues = await context.github.search.issues({
        q: `in:title ${opts.issue} repo:${owner}/${repo}`
      })
      const issue = issues.data.items.find(i => i.title === opts.issue)
      number = issue.number
    } else if (typeof opts.issue === 'number') {
      number = opts.issue
    }
  } else {
    number = (context.payload.issue || context.payload.pull_request || context.payload).number
  }

  const params = context.repo({
    number,
    body: await context.fromFile(opts.with, opts.data)
  })

  return context.github.issues.createComment(params)
}
