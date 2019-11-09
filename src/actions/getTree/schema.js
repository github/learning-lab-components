const Joi = require('@hapi/joi')

module.exports = Joi.object({
  sha: Joi.string()
    .meta({ label: 'Sha' })
    .description('The commit sha to get the tree for.'),
  recursive: Joi.boolean()
    .meta({ label: 'Recursive' })
    .description('Include sub-paths, not just the top level directory.')
    .default(false)
})
  .description('Gets a Git tree at either a given sha or the head of master')
  .example([
    {},
    { context: 'Get the tree at the current SHA:' }
  ])
  .example([
    { recursive: true },
    { context: 'Get a recursive tree, to include files nested in directories:' }
  ])
