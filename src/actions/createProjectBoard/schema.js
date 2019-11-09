const Joi = require('@hapi/joi')

module.exports = Joi.object({
  name: Joi.string()
    .meta({ label: 'Name' })
    .description('The name of the project board.')
    .required(),
  description: Joi.string()
    .meta({ label: 'Description' })
    .description('The description of the project board.'),
  columns: Joi.array()
    .meta({ label: 'Columns' })
    .description('A list of columns to create.')
    .items(Joi.string())
    .min(1)
})
  .description('Creates a new Project Board in the user\'s repository')
  .example([
    { name: 'New board' },
    { context: 'Create a new project board:' }
  ])
  .example([
    {
      name: 'New board',
      description: 'This board is the best board',
      columns: [
        'To do',
        'In progress',
        'Done'
      ]
    },
    { context: 'Create a project board with a description and some columns:' }
  ])
