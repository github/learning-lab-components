const Joi = require('@hapi/joi')

module.exports = Joi.object({
  branch: Joi.string()
    .meta({ label: 'Branch' })
    .description('The name of the branch to delete. ')
    .required()
})
  .description('Deletes the provided branch')
  .example([
    { branch: 'example-branch' },
    { context: 'Delete the `example-branch` branch:' }
  ])
