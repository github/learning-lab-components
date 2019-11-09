const Joi = require('@hapi/joi')
const gate = require('../gate/schema')

const state = Joi.object({
  description: Joi.string()
    .meta({ label: 'Description' }),
  target_url: Joi.string()
    .meta({ label: 'Target URL' })
    .uri()
})

module.exports = Joi.object({
  state: Joi.alternatives()
    .try(
      Joi.string().valid('error', 'failure', 'pending', 'success'),
      gate
    )
    .meta({ label: 'State' })
    .description('The state of the status to create.')
    .required(),
  error: state.meta({ label: 'Error' }),
  pending: state.meta({ label: 'Pending' }),
  failure: state.meta({ label: 'Failure' }),
  success: state.meta({ label: 'Success' }),
  sha: Joi.string()
    .meta({ label: 'Sha' })
    .description('The commit sha to create the status for. This will default to the head commit from the webhook payload if available.'),
  context: Joi.string()
    .meta({ label: 'Context' })
    .description('A unique identifier for this status - this can be used to overwrite an existing status on the same sha.')
})
  .description('Creates a status on a commit or pull request')
  .example([
    {
      state: {
        left: true,
        operator: '===',
        right: false
      },
      failure: {
        description: 'Your pull request needs a description in the body. Please edit the pull request to include a body.',
        target_url: 'https://help.github.com/articles/editing-a-comment/'
      },
      success: {
        description: 'Your pull request has a body description.',
        target_url: 'https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request'
      }
    },
    { context: 'Use a conditional to determine the state:' }
  ])
  .example([
    {
      state: 'failure',
      context: 'my-special-context'
    },
    { context: 'Specify a context to be able to overwrite the status in a later action:' }
  ])
