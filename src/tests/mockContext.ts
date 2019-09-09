import get from 'get-value';
import has from 'has';
import { Context as ProbotContext } from 'probot/lib/context';
import { LoggerWithTarget } from 'probot/lib/wrap-logger';
import Webhooks from '@octokit/webhooks';
import { GitHubAPI } from 'probot/lib/github';

import * as types from '../types';

// IMPORTANT:
// This class is duck-typed based on the real Context object in GitHub Learning Lab.
// It has only been given enough API surface area to support the existing actions.
class Context extends ProbotContext {

  // Property 'preferences' does not exist on type 'Context'.
  preferences: null;
  fromFile!: jest.Mock<any, any>;
  runActions!: jest.Mock<any, any>;
  
  constructor ({ 
    event, github, log }: {
      event: Partial<Webhooks.WebhookEvent<any>>, 
      github: Partial<GitHubAPI>, 
      log: Partial<LoggerWithTarget> 
    }, 
    { user, step, registration }: { 
      user: { 
        login: string}, 
        step: { slug: string },
        registration: { id: number } 
    }) {

    const childLog: LoggerWithTarget = (<LoggerWithTarget>log).child({ user: user.login, registration_id: registration.id })

    super(
      (<Webhooks.WebhookEvent<any>>event), 
      <GitHubAPI>github, 
      <LoggerWithTarget>childLog
    )

    // Memoize values
    Object.assign(this, {
      registration,
      step,
      user
    })

    this.preferences = null
  }

  /**
   * Returns either the provided string with everything between % characters replaced
   * by the referenced variable on the context object.
   *
   * @example
   *
   * const value = context.getValueFromContext('%payload.sender.id%')
   * // value: 123
   *
   * @param {string} query - May be a templated string, like `%payload.sender.id%`
   * @returns {string}
   */
  getValueFromContext (query: string): string {
    const singleMatchReg: RegExp = /^%[^%]+%$/
    const multiMatchReg: RegExp = /\\%|(?<!\\)%([^%]+)(?<!\\)%/g

    if (typeof query === 'string') {
      // If the templated string is the whole string, then return
      // the corresponding raw object regardless of its data type
      if (singleMatchReg.test(query)) {
        return get(this, query.slice(1, -1))
      }

      return query.replace(multiMatchReg, (match, key) => {
        if (match === '\\%') {
          return '%'
        }
        return get(this, key)
      })
    }

    // If no matches were found, return the original string
    return query
  }

  /**
   * Loops through the provided object and replaces values with properties from
   * the context instance (like the payload or user).
   *
   * @param {object} obj
   * @returns {object}
   */
  getValuesFromContext (
    obj: types.IObject
  ) {
    const o = Object.assign({}, obj)

    for (const key in o) {
      o[key] = this.getValueFromContext(o[key])
    }

    // Always look through to the `data` object
    if (has(o, 'data')) {
      o.data = this.getValuesFromContext(o.data)
    }

    return o
  }
}

export default (payload: Partial<ProbotContext>, github: GitHubAPI): ProbotContext => {
  const context: Context = new Context(
    {
      event: {
        payload: {
          repository: { owner: { login: 'JasonEtco' }, name: 'example' },
          ...payload
        }
      },
      github: {
        hook: { before: jest.fn() },
        ...github
      },
      log: {
        // @ts-ignore
        info: jest.fn(),
        // @ts-ignore
        error: jest.fn(),
        // @ts-ignore
        debug: jest.fn(),
        // @ts-ignore
        child: function () {
          return this
        }
      }
    },
    {
      user: { login: 'JasonEtco' },
      step: { slug: 'my-step' },
      registration: { id: 123 }
    }
  )
  context.preferences = null

  //
  // Mock some async methods
  //
  context.fromFile = jest.fn().mockImplementation((name, data) => Promise.resolve(name))
  context.runActions = jest.fn()

  return context
}
