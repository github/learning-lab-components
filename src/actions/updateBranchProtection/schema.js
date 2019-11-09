const Joi = require('@hapi/joi')

module.exports = Joi.object({
  branch: Joi.string()
    .meta({ label: 'Branch' })
    .description('The name of the branch to update protection settings on. This defaults to `master`.')
    .default('master'),
  enforce_admins: Joi.boolean()
    .meta({ label: 'Enforce protection for admins' })
    .description('If enabled, these protection settings will be enforced for repository admins.')
    .default(true),
  required_status_checks: Joi.object({
    strict: Joi.boolean()
      .meta({ label: 'Require branches to be up to date before merging' }),
    contexts: Joi.array()
      .meta({ label: 'Contexts' })
      .description('A list of status contexts to require')
      .items(Joi.string())
  })
    .meta({ label: 'Required status checks' })
    .description('A list of status checks that are required before a pull request can be merged into this branch.'),
  required_pull_request_reviews: Joi.object({
    include_admins: Joi.boolean()
      .meta({ label: 'Include admins' })
  })
    .meta({ label: 'Required pull request reviews' })
})
  .description('Updates the branch protection on a branch in the course repository')
  .example([
    {},
    { context: 'Add branch protection to the `master` branch:' }
  ])
  .example([
    { branch: 'my-protected-branch' },
    { context: 'Set branch protection on `my-protected-branch`:' }
  ])
  .example([
    { enforce_admins: false },
    { context: 'Include specific branch protection settings:' }
  ])
