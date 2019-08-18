const Joi = require('@hapi/joi')

module.exports = Joi.object({
  issue: Joi.alternatives().try([Joi.number(), Joi.string()])
    .meta({ label: 'Issue' })
    .description('The number or title of the issue to assign.')
})
  .description('Assigns the registered user to an issue or pull request')
  .example(
    [
      {},
      { context: 'Use the issue from the webhook payload:' }
    ],
    [
      { issue: 'Title of an issue' },
      { context: 'Use the title of an issue:' }
    ],
    [
      { issue: 4 },
      { context: 'Use an issue number:' }
    ]
  )