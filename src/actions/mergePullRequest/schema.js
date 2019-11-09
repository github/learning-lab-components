const Joi = require('@hapi/joi')

module.exports = Joi.object({
  pullRequest: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Pull request' })
    .description('The number or title of the pull request to merge. This will default to the pull request number from the trigger event.')
})
  .description('Merges a Pull Request on GitHub.')
  .example([
    { pullRequest: 1 },
    { context: 'Use a pull request number:' }
  ])
  .example([
    { pullRequest: 'An existing pull request' },
    { context: 'Use the title of a pull request:' }
  ])
