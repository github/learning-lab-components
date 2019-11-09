const Joi = require('@hapi/joi')

module.exports = Joi.object({
  issue: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Issue' })
    .description('The number or title of the issue to get. This will default to the issue number from the trigger event.')
})
  .description('Gets an Issue from GitHub.')
  .example([
    { issue: 'An existing issue' },
    { context: 'Use the title of an issue:' }
  ])
  .example([
    { issue: 1 },
    { context: 'Use an issue number:' }
  ])
