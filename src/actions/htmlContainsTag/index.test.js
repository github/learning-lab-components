const htmlContainsTag = require('./')

describe('htmlContainsTag', () => {
  it('returns true if the HTML contains the given tag', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><div>Hello!</div></html>', tag: 'div' })
    expect(actual).toBe(true)
  })

  it('returns false if the HTML does not contain the given tag', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><div>Hello!</div></html>', tag: 'pizza' })
    expect(actual).toBe(false)
  })

  it('returns true if the HTML contains the given tag but not a closing tag', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><body>Hello!</html>', tag: 'body' })
    expect(actual).toBe(false)
  })

  it('returns false if the HTML does not contain the given tag', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><div>Hello!</div></html>', tag: 'pizza' })
    expect(actual).toBe(false)
  })

  it('returns true if the HTML does contain the given tag and is a self-closing tag', async () => {
    expect(await htmlContainsTag(null, { html: '<html><img src="sadfsd"/></html>', tag: 'img' })).toBe(true)
    expect(await htmlContainsTag(null, { html: '<html><img src="sadfsd" /></html>', tag: 'img' })).toBe(true)
    expect(await htmlContainsTag(null, { html: '<html><img src="sdfasdf"></html>', tag: 'img' })).toBe(true)
    expect(await htmlContainsTag(null, { html: '<html><img src="dfsadfas" ></html>', tag: 'img' })).toBe(true)
  })

  it('returns false if the HTML is not valid', async () => {
    const actual = await htmlContainsTag(null, { html: '<><><>', tag: 'div' })
    expect(actual).toBe(false)
  })

  it('returns true if the tag does have the correct attribute', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><img src="pizza" /></html>', tag: 'img', attribute: 'src' })
    expect(actual).toBe(true)
  })

  it('returns false if the tag does not have the correct attribute', async () => {
    const actual = await htmlContainsTag(null, { html: '<html><img source="pizza" /></html>', tag: 'img', attribute: 'src' })
    expect(actual).toBe(false)
  })
})
