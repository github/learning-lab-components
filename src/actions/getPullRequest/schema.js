const Joi = require('@hapi/joi')

module.exports = Joi.object({
  pullRequest: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Pull request' })
    .description('The number or title of the pull request to get. This will default to the pull request number from the trigger event.'),
  waitForMergeable: Joi.boolean()
    .meta({ label: 'Wait until mergeable' })
    .description('Only move on to the next action when GitHub has calculated whether or not the pull request is mergeable.')
    .default(false)
})
  .description('Gets a Pull Request from GitHub.')
  .example([
    { pullRequest: 1 },
    { context: 'Use a pull request number:' }
  ])
  .example([
    { pullRequest: 'An existing pull request' },
    { context: 'Use the title of a pull request:' }
  ])
