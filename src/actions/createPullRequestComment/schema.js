const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  body: Joi.string()
    .meta({ label: 'Body', isResponse: true })
    .description('The body of the pull request comment.')
    .required(),
  file: Joi.string()
    .meta({ label: 'File' })
    .description('The name of the file to create the pull request comment on.')
    .required(),
  position: Joi.number()
    .meta({ label: 'Position' })
    .description('The position of the comment to be generated. This is the line number of the combined diff of the pull request.')
    .required(),
  pullRequest: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Pull request' })
    .description('The title or number of the pull request. If omitted, the comment will be created on the pull request from the trigger event.'),
  data
})
  .description('Creates a comment on a pull request on GitHub')
  .example([
    {
      body: 'suggested-changes.md',
      file: 'some-file.js',
      position: 5
    },
    { context: 'Create the comment on the pull request from the webhook event:' }
  ])
  .example([
    {
      pullRequest: 10,
      body: 'suggested-changes.md',
      file: 'some-file.js',
      position: 5
    },
    { context: 'Use the number of a pull request:' }
  ])
  .example([
    {
      pullRequest: 'Some pull request',
      body: 'suggested-changes.md',
      file: 'some-file.js',
      position: 5
    },
    { context: 'Use a pull request title:' }
  ])
