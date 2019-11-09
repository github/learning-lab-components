const Joi = require('@hapi/joi')

module.exports = Joi.object({
  pullRequest: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Pull request' })
    .description('The number or title of the pull request to request a review. This will default to the pull request number from the trigger event.')
})
  .description('Requests a Pull Request review from the registrant')
  .example([
    {
      pullRequest: 'A pull request'
    },
    { context: 'Use the title of a pull request:' }
  ])
  .example([
    {
      pullRequest: 2
    },
    { context: 'Use a pull request number:' }
  ])
