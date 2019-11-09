const has = require('has')

module.exports = async (context, opts) => {
  let sha

  if (!has(opts, 'sha')) {
    if (has(context.payload, 'pull_request')) {
      sha = context.payload.pull_request.head.sha
    } else if (context.payload.head_commit) {
      sha = context.payload.head_commit.id
    }
  } else {
    sha = opts.sha
  }

  if (!sha) throw new Error('getFileContents is missing a sha!')

  const tree = await context.github.gitdata.getTree(context.repo({ tree_sha: sha, recursive: 1 }))
  const file = tree.data.tree.find(file => file.path === opts.filename)

  try {
    const blob64 = await context.github.gitdata.getBlob(context.repo({ file_sha: file.sha }))
    return Buffer.from(blob64.data.content, 'base64').toString()
  } catch (err) {
    // Return false if the file does not exist so we can react with `gate`
    return false
  }
}
