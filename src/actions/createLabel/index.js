module.exports = async (context, opts) => {
  return context.github.issues.createLabel(context.repo({
    name: opts.name,
    color: opts.color,
    description: opts.description
  }))
}
