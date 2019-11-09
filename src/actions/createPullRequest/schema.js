const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  title: Joi.string()
    .meta({ label: 'Title' })
    .description('The title of the pull request.')
    .required(),
  body: Joi.string()
    .meta({ label: 'Body', isResponse: true })
    .description('The body of the pull request.')
    .required(),
  head: Joi.string()
    .meta({ label: 'Head branch' })
    .description('The head branch of the pull request.')
    .required(),
  base: Joi.string()
    .meta({ label: 'Base branch' })
    .description('The base branch of the pull request. This defaults to `master`.')
    .default('master'),
  comments: Joi.array()
    .meta({ label: 'Comments' })
    .description('A list of response files that will be posted to the issue as comments upon creation.')
    .items(Joi.string()),
  data
})
  .description('Opens a new Pull Request on GitHub.')
  .example([
    {
      title: 'Title of the Pull Request',
      body: 'pull-request-body.md',
      head: 'this-branch'
    },
    { context: 'Create a pull request from the `this-branch` branch:' }
  ])
  .example([
    {
      title: 'Title of the Pull Request',
      body: 'pull-request-body.md',
      head: 'this-branch',
      comments: [
        'pr-comment.md'
      ]
    },
    { context: 'Create a pull request and create a comment on it:' }
  ])
  .example([
    {
      title: 'Title of the Pull Request',
      body: 'pull-request-body.md',
      head: 'this-branch',
      base: 'not-master'
    },
    { context: 'Create a pull request to a specified `base` branch:' }
  ])
