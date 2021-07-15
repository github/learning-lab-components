const Joi = require('@hapi/joi')

module.exports = Joi.object()
  .description('Creates a repository webhook to send debug information to smee.io. This is only enabled for "draft" versions of a course.')
  .example([
    {},
    { context: 'Send repository payload information to smee.io:' }
  ])
