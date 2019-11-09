const Joi = require('@hapi/joi')
const data = require('../../schemas/data')

module.exports = Joi.object({
  filename: Joi.string()
    .meta({ label: 'File name' })
    .description('The name of the file to create. This must be a file in the `responses` folder of your course repository.')
    .required(),
  branch: Joi.string()
    .meta({ label: 'Branch' })
    .description('The branch on which to create the file. This defaults to `master`.')
    .default('master'),
  message: Joi.string()
    .meta({ label: 'Message' })
    .description('The commit message for the commit that creates the file.'),
  new_name: Joi.string()
    .meta({ label: 'New name' })
    .description('The name of the file to be created. This can include a path, like `example/file.md`.'),
  data
})
  .description('Creates a new file')
  .example([
    {
      filename: 'README.md',
      data: {
        foo: 'bar'
      }
    },
    { context: 'Include some data to be passed as {{ variables }}:' }
  ])
  .example([
    { filename: 'response.md' },
    { context: 'Automatically use the repository\'s default branch:' }
  ])
  .example([
    {
      filename: 'response.md',
      branch: 'my-feature-branch'
    },
    { context: 'Specify a branch:' }
  ])
  .example([
    {
      filename: 'example-codeowners.md',
      new_name: '.github/CODEOWNERS'
    },
    { context: 'Name the file something new in the repository:' }
  ])
