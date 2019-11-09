const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  with: Joi.string()
    .meta({ label: 'With', isResponse: true })
    .description('The name of the response file to use in the generated comment.')
    .required(),
  issue: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Issue or pull request' })
    .description('The number or title of the issue or pull request to comment on. This will default to the number from the trigger event.'),
  data
})
  .description('Posts a comment on an issue or pull request')
  .example([
    { with: 'my-response.md' },
    { context: 'Respond to the issue from the webhook event:' }
  ])
  .example([
    {
      with: 'my-response.md',
      issue: 'Title of an issue to comment in'
    },
    { context: 'Use an issue title:' }
  ])
  .example([
    {
      with: 'my-response.md',
      issue: 4
    },
    { context: 'Use the number of an issue:' }
  ])
