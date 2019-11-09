const has = require('has')

module.exports = async (context, opts) => {
  // Create a new project board
  const newProjectBoard = await context.github.projects.createRepoProject(context.repo({
    name: opts.name,
    body: opts.description
  }))

  // Bootstrap it with the appropriate columns
  if (has(opts, 'columns') && Array.isArray(opts.columns)) {
    for (const column of opts.columns) {
      await context.github.projects.createProjectColumn({
        project_id: newProjectBoard.data.id,
        name: column
      })
    }
  }

  // Return the project board itself
  return newProjectBoard
}
