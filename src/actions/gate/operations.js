const stringToRegEx = require('../../helpers/string-to-regex')
const isRegExString = str => str.startsWith('/') && str.endsWith('/')

module.exports = {
  '===': (l, r) => l === r,
  '==': (l, r) => l == r, // eslint-disable-line
  '!==': (l, r) => l !== r,
  '!=': (l, r) => l != r, // eslint-disable-line
  '>': (l, r) => l > r,
  '>=': (l, r) => l >= r,
  '<': (l, r) => l < r,
  '<=': (l, r) => l <= r,
  search: (l, r) => l.search(stringToRegEx(r)) > -1,
  test: (l, r) => (stringToRegEx(l)).test(r),
  includes: (l, r) => {
    const [key, value] = r.split(':')
    if (value) {
      if (isRegExString(value)) {
        const reg = stringToRegEx(value)
        return l.some(o => reg.test(o[key]))
      } else {
        return l.some(o => o[key] === value)
      }
    } else {
      if (isRegExString(r)) {
        const reg = stringToRegEx(r)
        return l.some(o => reg.test(o))
      } else {
        return l.some(o => o === r)
      }
    }
  },
  // Can't use arrow function here because
  // we are referencing `this`
  '!test': function (l, r) {
    return !(this.test(l, r))
  },
  '!includes': function (l, r) {
    return !(this.includes(l, r))
  }
}
