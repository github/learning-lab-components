const findInTree = require('./')

describe('findInTree', () => {
  let tree, context

  beforeEach(() => {
    tree = [
      { path: 'example.md' },
      { path: '_posts/example.md' }
    ]

    context = {}
  })

  it('finds the file by path within the tree', async () => {
    const actual = await findInTree(context, { tree, path: 'example.md' })
    expect(actual).toEqual({ path: 'example.md' })
  })

  it('finds the file by RegEx\'d path within the tree', async () => {
    const actual = await findInTree(context, { tree, path: '/_posts/' })
    expect(actual).toEqual({ path: '_posts/example.md' })
  })

  it('returns undefined if nothing is found', async () => {
    const actual = await findInTree(context, { tree, path: 'pizza.md' })
    expect(actual).toEqual(undefined)
  })
})
