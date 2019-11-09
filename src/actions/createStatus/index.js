const has = require('has')
const gate = require('../gate')

const realStates = ['pending', 'success', 'failure']
module.exports = async (context, opts) => {
  let state = 'pending'
  if (typeof opts.state === 'string') {
    if (!realStates.includes(opts.state)) {
      const stateString = context.getValueFromContext(opts.state)
      state = stateString ? 'success' : 'failure'
    } else {
      state = opts.state
    }
  } else if (typeof opts.state === 'object') {
    const data = context.getValuesFromContext(opts.state)
    state = gate(context, data) ? 'success' : 'failure'
  }

  const { owner, repo } = context.repo()
  const data = {
    context: context.step.slug || opts.context,
    owner,
    repo,
    state,
    sha: opts.sha || context.payload.pull_request.head.sha || context.payload.head_commit.id
  }

  if (has(opts, state)) {
    Object.assign(data, opts[state])
  }

  const optional = ['target_url', 'description']
  for (const opt of optional) {
    if (has(opts, opt)) {
      data[opt] = opts[opt]
    }
  }

  return context.github.repos.createStatus(context.repo(data))
}
