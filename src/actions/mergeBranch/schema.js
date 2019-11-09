const Joi = require('@hapi/joi')

module.exports = Joi.object({
  head: Joi.string()
    .meta({ label: 'Head branch' })
    .description('The head branch to merge from.')
    .required(),
  base: Joi.string()
    .meta({ label: 'Base branch' })
    .description('The base branch to merge into. This defaults to `master`.')
    .default('master')
})
  .description('Merges a branch into another branch')
  .example([
    { head: 'a-feature-branch' },
    { context: 'Merge `a-feature-branch` into the `master` branch:' }
  ])
  .example([
    {
      head: 'a-feature-branch',
      base: 'release-one'
    },
    { context: 'Merge `a-feature-branch` into a specific branch:' }
  ])
