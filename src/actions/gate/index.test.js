const gate = require('./')
const operations = require('./operations')
const mockContext = require('../../tests/mockContext')

describe('gate', () => {
  let context

  beforeEach(() => {
    context = mockContext({
      body: 'test',
      issue: { number: 1 }
    })
  })

  it('returns true if the gate resolves truthy', async () => {
    const opts = { left: 'test', operator: '===', right: 'test' }
    const success = await gate(context, opts)
    expect(success).toBe(true)
  })

  it('returns false if the gate resolves falsy', async () => {
    const opts = { left: 'test', operator: '===', right: 'nope' }
    const success = await gate(context, opts)
    expect(success).toBe(false)
  })

  it('evaluates correctly with multiple gates', async () => {
    // All resolve to true
    expect(await gate(context, {
      gates: [
        { left: 'test', operator: '===', right: 'test' },
        { left: 'yep', operator: '===', right: 'yep' }
      ]
    })).toBe(true)

    // At least one resolves to true
    expect(await gate(context, {
      gates: [
        { left: 'test', operator: '===', right: 'tester' },
        { left: 'yep', operator: '===', right: 'yep' }
      ]
    })).toBe(true)

    // All resolve to false
    expect(await gate(context, {
      gates: [
        { left: 'test', operator: '===', right: 'tester' },
        { left: 'yep', operator: '===', right: 'nope' }
      ]
    })).toBe(false)
  })

  it('evaluates correctly with multiple gates and every set to true', async () => {
    // At least one resolves to false
    expect(await gate(context, {
      every: true,
      gates: [
        { left: 'test', operator: '===', right: 'test' },
        { left: 'yep', operator: '===', right: 'nope' }
      ]
    })).toBe(false)
  })

  it('returns a boolean with no operator/right properties', async () => {
    expect(await gate(context, { left: 'I exist!' })).toBe(true)
    expect(await gate(context, { left: undefined })).toBe(false)
  })

  it('runs the else action when evaluating falsy', async () => {
    await gate(context, {
      left: 'hi',
      operator: '===',
      right: 'bye',
      else: {
        type: 'respond',
        with: 'hello'
      }
    })

    expect(context.runActions).toHaveBeenCalled()
    expect(context.runActions.mock.calls).toMatchSnapshot()
  })

  it('runs multiple else actions', async () => {
    await gate(context, {
      left: 'hi',
      operator: '===',
      right: 'bye',
      else: [{
        type: 'respond',
        with: 'hello'
      }, {
        type: 'respond',
        with: 'hiya!'
      }]
    })

    expect(context.runActions).toHaveBeenCalled()
    expect(context.runActions.mock.calls).toMatchSnapshot()
  })

  it('evalutes correctly with the `includes` operator', async () => {
    const opts = { left: [{ name: 'Jason' }], operator: 'includes', right: 'name:Jason' }
    expect(await gate(context, opts)).toBe(true)
    expect(await gate(context, { ...opts, right: 'name:NotJason' })).toBe(false)
  })

  it('evaluates correctly with a falsy `right`', async () => {
    const opts = { left: '', operator: '===', right: '' }
    const success = await gate(context, opts)
    expect(success).toBe(true)
  })

  it('evaluates correctly with a literal `false` value for `right`', async () => {
    const opts = { left: true, operator: '===', right: false }
    const success = await gate(context, opts)
    expect(success).toBe(false)
  })

  describe('operations', () => {
    test('===', () => {
      expect(operations['==='](1, 1)).toBe(true)
    })
    test('==', () => {
      expect(operations['=='](1, '1')).toBe(true)
    })
    test('!==', () => {
      expect(operations['!=='](1, 2)).toBe(true)
    })
    test('!=', () => {
      expect(operations['!='](1, '2')).toBe(true)
    })
    test('>', () => {
      expect(operations['>'](2, 1)).toBe(true)
    })
    test('>=', () => {
      expect(operations['>='](2, 1)).toBe(true)
    })
    test('<', () => {
      expect(operations['<'](1, 2)).toBe(true)
    })
    test('<=', () => {
      expect(operations['<='](1, 2)).toBe(true)
    })
    test('search', () => {
      expect(operations.search('test', 'tes')).toBe(true)
    })
    test('test', () => {
      expect(operations.test('/TE/i', 'test')).toBe(true)
    })
    test('!test', () => {
      expect(operations['!test']('/TE/i', 'test')).toBe(false)
    })
    test('includes', () => {
      expect(operations.includes(['a', 'b'], 'a')).toBe(true)
      expect(operations.includes(['abc', 'absolute'], 'a')).toBe(false)
      expect(operations.includes(['jason', 'eric'], '/^ja.*n$/')).toBe(true)
      expect(operations.includes([{ foo: 'a' }, { foo: 'b' }], 'foo:a')).toBe(true)
      expect(operations.includes([{ foo: 'jason' }, { foo: 'notjason' }], 'foo:/jason/')).toBe(true)
      expect(operations.includes([{ foo: 'jason' }, { foo: 'notjason' }], 'foo:/adam/')).toBe(false)
    })
    test('!includes', () => {
      expect(operations['!includes'](['a', 'b'], 'a')).toBe(false)
      expect(operations['!includes'](['jason', 'eric'], '/^ja.*n$/')).toBe(false)
      expect(operations['!includes']([{ foo: 'a' }, { foo: 'b' }], 'foo:a')).toBe(false)
      expect(operations['!includes']([{ foo: 'jason' }, { foo: 'notjason' }], 'foo:/jason/')).toBe(false)
      expect(operations['!includes']([{ foo: 'jason' }, { foo: 'notjason' }], 'foo:/adam/')).toBe(true)
    })
  })
})
