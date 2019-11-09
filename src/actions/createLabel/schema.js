const Joi = require('@hapi/joi')

module.exports = Joi.object({
  name: Joi.string()
    .meta({ label: 'Name' })
    .description('The name of the label.')
    .required(),
  color: Joi.string()
    .meta({ label: 'Color' })
    .description('The color of the label, as a hex color code.')
    .hex()
    .required(),
  description: Joi.string()
    .meta({ label: 'Description' })
    .description('The description of the label.')
})
  .description('Creates a new label on GitHub.')
  .example([
    {
      name: 'a label',
      color: 'f87000'
    },
    { context: 'Create a new label:' }
  ])
  .example([
    {
      name: 'another label',
      color: 'f87000',
      description: 'This label is used to label things'
    },
    { context: 'A description can also be included:' }
  ])
