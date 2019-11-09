module.exports = async (context, opts) => {
  // Fill in template variables
  const content = await context.fromFile(opts.filename, opts.data)

  // Convert to base64 for GitHub
  const blob64 = Buffer.from(content).toString('base64')

  const path = opts.new_name || opts.filename
  const message = opts.message || `Creating new file ${path}`

  // Prepare params
  const params = context.repo({
    path,
    message,
    content: blob64
  })

  // If no branch is provided, GitHub will use the default_branch
  if (opts.branch) params.branch = opts.branch

  return context.github.repos.createFile(params)
}
