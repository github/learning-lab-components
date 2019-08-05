module.exports = async (context, opts) => {
  return context.github.repos.merge(context.repo({
    base: opts.base || 'master',
    head: opts.head
  }))
}
