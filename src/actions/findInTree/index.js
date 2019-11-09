const stringToRegEx = require('../../helpers/string-to-regex')

module.exports = async (context, opts) => {
  const reg = stringToRegEx(opts.path)
  const tester = file => reg.test(file.path)

  if (opts.multiple) {
    return opts.tree.filter(tester)
  } else {
    return opts.tree.find(tester)
  }
}
