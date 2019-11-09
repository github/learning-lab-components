const Joi = require('@hapi/joi')

module.exports = Joi.object()
  .meta({ label: 'Data' })
  .description('An object of data that will be used in the response template. This can include values from the webhook payload, information about the user, or values returned from previous actions in the same step.')
  .unknown()
  .pattern(Joi.string(), Joi.string())
