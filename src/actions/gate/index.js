const has = require('has')
const operations = require('./operations')

function evaluate (options) {
  const { left, operator, right } = options
  if (operator && has(options, 'right')) {
    if (!has(operations, operator)) throw new Error(`Operation \`${operator}\` does not exist.`)
    return operations[operator](left, right)
  } else {
    return Boolean(left)
  }
}

module.exports = async (context, opts, { stack = [] } = {}) => {
  let success
  if (has(opts, 'gates')) {
    // Either Array.some or Array.every
    const method = opts.every ? 'every' : 'some'
    success = opts.gates[method](gate => {
      const opts = context.getValuesFromContext(gate)
      return evaluate(opts)
    })
  } else {
    success = evaluate(opts)
  }

  if (has(opts, 'else') && success === false) {
    if (stack.length === 0) {
      stack.push('gate')
    }
    stack[stack.length - 1] += '.else'
    const elseActions = Array.isArray(opts.else) ? opts.else : [opts.else]
    await context.runActions(elseActions, { stack })
  }

  return success
}
