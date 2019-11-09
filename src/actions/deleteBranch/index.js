module.exports = async (context, opts) => {
  return context.github.gitdata.deleteRef(context.repo({
    ref: `heads/${opts.branch}`
  }))
}
