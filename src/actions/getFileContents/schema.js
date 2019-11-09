const Joi = require('@hapi/joi')

module.exports = Joi.object({
  filename: Joi.string()
    .meta({ label: 'File name' })
    .description('Name of the file to retrieve.')
    .required(),
  sha: Joi.string()
    .meta({ label: 'Sha' })
    .description('The commit sha at which to retrieve the file contents. This will default to the head commit sha from the pull request or push payload.')
})
  .description('Gets the contents of a file at a specific commit.')
  .example([
    { filename: 'README.md' },
    { context: 'Get the contents of a file:' }
  ])
