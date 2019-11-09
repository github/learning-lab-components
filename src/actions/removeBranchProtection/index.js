module.exports = async (context, opts) => {
  return context.github.repos.removeBranchProtection(context.repo({
    branch: opts.branch || 'master'
  }))
}
