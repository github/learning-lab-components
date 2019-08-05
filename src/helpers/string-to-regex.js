module.exports = (input) => {
  // Validate input
  if (typeof input !== 'string') {
    throw new Error('Invalid input. Input must be a string')
  }

  // Parse input
  const m = input.match(/(\/?)(.+)\1([a-z]*)/i)

  // Invalid flags
  if (m[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3])) {
    return RegExp(input)
  }

  // Create the regular expression
  return new RegExp(m[2], m[3])
}
