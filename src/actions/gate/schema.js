const Joi = require('@hapi/joi')
const operations = require('./operations')

const gate = Joi.object({
  left: Joi.alternatives().try(Joi.number(), Joi.string(), Joi.boolean())
    .meta({ label: 'Left' })
    .description('The left side of the `if`. If no `operator` or `right` is present, this will be evaluated on its own.'),
  operator: Joi.string()
    .meta({ label: 'Operator' })
    .description('The conditional operator to use when evaluating the gate.')
    .valid(...Object.keys(operations)),
  right: Joi.alternatives().try(Joi.number(), Joi.string(), Joi.boolean())
    .meta({ label: 'Right' })
    .description('The right side of the `if`.')
})

module.exports = gate.append({
  gates: Joi.array()
    .meta({ label: 'Multiple gates' })
    .description('Test against multiple conditions.')
    .items(gate),
  every: Joi.boolean()
    .meta({ label: 'Require every gate to pass' })
    .default(false),
  else: Joi.array()
    .meta({ label: 'Else' })
    .description('An action or list of actions to run if the gate fails.')
    .items(Joi.object().unknown())
    .single()
})
  .description('Decides if the next action(s) should be run, and if the step passes or fails.')
  .example([
    {
      left: 'hello',
      operator: '===',
      right: 'hello'
    },
    { context: 'Check if the left and right values are equal:' }
  ])
  .example([
    {
      left: '%payload.sender.login%',
      operator: '===',
      right: '%user.login%'
    },
    { context: 'Compare different values from the context of the action:' }
  ])
  .example([
    {
      left: '%payload.sender.login%',
      operator: '===',
      right: '%user.login%',
      else: [
        {
          type: 'respond',
          with: 'This returned false!'
        }
      ]
    },
    { context: 'Use the `else` property to run actions if the condition is falsey:' }
  ])
  .example([
    {
      gates: [
        {
          left: '%payload.sender.login%',
          operator: '===',
          right: '%user.login%'
        },
        {
          left: '%payload.sender.login%',
          operator: '===',
          right: 'JasonEtco'
        }
      ]
    },
    { context: 'Test multiple conditions:' }
  ])
