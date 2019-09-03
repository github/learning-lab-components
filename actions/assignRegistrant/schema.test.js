const Joi = require('@hapi/joi')
const schema = require('./schema')

describe('assignRegistrant Schema', () => {
  it('Validates an Issue title without error', () => {
    const validatedData = Joi.validate({ issue: 'String issue title' }, schema)
    expect(validatedData.error).toBeNull()
  })
  it('Validates an Issue number without error', () => {
    const validatedData = Joi.validate({ issue: 1 }, schema)
    expect(validatedData.error).toBeNull()
  })
  it('Throws an errror if Issue is an object', () => {
    const validatedData = Joi.validate({ issue: { number: 1 } }, schema)
    expect(validatedData.error).not.toEqual(null)
  })
  it('Throws an error if Issue is an array', () => {
    const validatedData = Joi.validate({ issue: ['Issue title', 2] }, schema)
    expect(validatedData.error).not.toEqual(null)
  })
})
