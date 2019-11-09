const Joi = require('@hapi/joi')

module.exports = Joi.object({
  method: Joi.string()
    .meta({ label: 'Method' })
    .description('The method on the Octokit SDK to use. This should be a string like `issues.create`.')
    .required()
}).options({ allowUnknown: true })
  .description('Calls a method in the Octokit library. [https://octokit.github.io/rest.js/](https://octokit.github.io/rest.js/)')
  .example([
    {
      method: 'repos.update',
      description: 'Description of the repository'
    },
    { context: 'Use the `repos.update` method to change the repository\'s description:' }
  ])
