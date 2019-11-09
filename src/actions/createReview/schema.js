const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  body: Joi.string()
    .meta({ label: 'Body', isResponse: true })
    .description('A response file for the body of the review.')
    .required(),
  event: Joi.string()
    .meta({ label: 'Event' })
    .description('The type of review to create.')
    .valid('APPROVE', 'REQUEST_CHANGES', 'COMMENT')
    .required(),
  number: Joi.number()
    .meta({ label: 'Number (deprecated)' })
    .description('The number of the pull request.'),
  pullRequest: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Pull request' })
    .description('The title or number of the pull request. If omitted, the comment will be created on the pull request from the trigger event.'),
  data
})
  .description('Creates a Pull Request review on GitHub')
  .example([
    {
      body: 'review-body.md',
      event: 'REQUEST_CHANGES'
    },
    { context: 'Create a review on the pull request from the webhook event:' }
  ])
  .example([
    {
      body: 'review-body.md',
      event: 'REQUEST_CHANGES',
      pullRequest: 3
    },
    { context: 'Use the number of a pull request:' }
  ])
  .example([
    {
      body: 'review-body.md',
      event: 'REQUEST_CHANGES',
      pullRequest: 'A pull request'
    },
    { context: 'Use a pull request title:' }
  ])
