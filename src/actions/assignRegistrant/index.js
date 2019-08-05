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
      if (issue) number = issue.number
    } else {
      number = opts.issue
    }

    if (!number) throw new Error('Issue could not be found')
  } else {
    number = context.issue().number
  }

  return context.github.request(context.repo({
    method: 'POST',
    url: '/repos/:owner/:repo/issues/:number/assignees',
    headers: { accept: 'application/vnd.github.symmetra-preview+json' },
    number,
    assignees: [context.user.login]
  }))
}
