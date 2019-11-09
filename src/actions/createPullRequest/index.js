const has = require('has')

module.exports = async (context, opts) => {
  const pr = await context.github.pullRequests.create(context.repo({
    title: opts.title,
    head: opts.head,
    base: opts.base || 'master',
    body: await context.fromFile(opts.body, opts.data)
  }))

  if (has(opts, 'comments')) {
    for (let i = 0; i < opts.comments.length; i++) {
      const comment = opts.comments[i]
      await context.github.issues.createComment(context.repo({
        number: pr.data.number,
        body: await context.fromFile(comment)
      }))
    }
  }

  return pr
}
