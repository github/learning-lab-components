const stringToRegEx = require('../../helpers/string-to-regex')

describe('stringToRegEx', () => {
  it('converts a string to a Regular Expression', () => {
    const actual = stringToRegEx('/test/')
    expect(actual).toBeInstanceOf(RegExp)
    expect(actual).toEqual(/test/)
  })

  it('converts a string with a / in it to a Regular Expression', () => {
    const actual = stringToRegEx('/te/st/')
    expect(actual).toBeInstanceOf(RegExp)
    expect(actual).toEqual(/te\/st/)
  })

  it('converts a string with many / in it to a Regular Expression', () => {
    const actual = stringToRegEx('/te/////st/')
    expect(actual).toBeInstanceOf(RegExp)
    expect(actual).toEqual(/te\/\/\/\/\/st/)
  })

  it('converts a string with flags to a Regular Expression with flags', () => {
    const actual = stringToRegEx('/test/g')
    expect(actual).toBeInstanceOf(RegExp)
    expect(actual).toEqual(/test/g)
  })

  it('throws if the input is not a string', () => {
    expect(() => stringToRegEx(true)).toThrowError('Invalid input. Input must be a string')
  })
})
