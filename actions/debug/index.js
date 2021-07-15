module.exports = async (context, opts) => {
  if (!context.courseVersion.draft) return
  const url = `https://smee.io/${context.course.slug}-${context.user.login}`
  await context.github.repos.createHook(context.repo({
    name: 'web',
    config: {
      url,
      content_type: 'json',
      // TODO: Fill in this list more intelligently
      events: ['push', 'issues', 'pull_request', 'issue_comment']
    }
  }))

  // TODO: Post the URL somewhere, like an issue or in the repository description.
}
