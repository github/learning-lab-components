const has = require('has')

module.exports = async (context, opts) => {
  let number = context.issue().number
  if (has(opts, 'issue')) {
    if (typeof opts.issue === 'string') {
      const { owner, repo } = context.repo()
      const issues = await context.github.search.issues({
        q: `is:issue in:title ${opts.issue} repo:${owner}/${repo}`
      })
      const issue = issues.data.items.find(i => i.title === opts.issue)
      number = issue.number
    } else {
      number = opts.issue
    }

    if (!number) throw new Error('Issue could not be found')
  }

  return context.github.issues.get(context.repo({ number }))
}
