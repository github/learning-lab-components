const has = require('has')
const { Parser } = require('htmlparser2')

/**
 * Checks an HTML string for a given tag
 * @param {import('../../context')} context - Context class
 * @param {Options} opts
 * @returns {boolean}
 */
module.exports = async (context, opts) => {
  let hasAttribute = true
  let hasOpen = false
  let hasClose = false

  const parser = new Parser({
    onopentag (name, attribs) {
      if (name === opts.tag) {
        hasOpen = true
        if (opts.attribute) {
          hasAttribute = has(attribs, opts.attribute)
        }
      }
    },
    onclosetag (name) {
      if (name === opts.tag) {
        // htmlparser2 says that everything has a closing tag, it can lie
        // Check that it actually exists with some custom RegEx
        const regular = new RegExp(`</${name}>`)

        // Self-closing tags look like <img />
        const selfClosing = new RegExp(`<${name}\\s.+\\s?/?>`)
        hasClose = regular.test(opts.html) || selfClosing.test(opts.html)
      }
    }
  })
  parser.write(opts.html)
  parser.end()
  return hasOpen && hasClose && hasAttribute
}

/**
 * @typedef Options
 * @prop {string} html - HTML string
 * @prop {string} tag - HTML tag to check for
 */
