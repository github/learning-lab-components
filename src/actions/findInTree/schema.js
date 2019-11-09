const Joi = require('@hapi/joi')

module.exports = Joi.object({
  path: Joi.string()
    .meta({ label: 'Path or RegEx' })
    .description('The path or RegEx of the file you want to find.')
    .required(),
  tree: Joi.string()
    .meta({ label: 'Tree' })
    .description('A Git tree. This is often used in conjunction with `getTree`.'),
  multiple: Joi.boolean()
    .meta({ label: 'Multiple' })
    .description('Return an array of values instead of just the first one that matches.')
    .default(false)
})
  .description('Finds a file in a given tree, either by path or matching a RegEx')
  .example([
    { path: 'example.md' },
    { context: 'Find the `example.md` file in the tree:' }
  ])
  .example([
    { path: '/^_posts\\//' },
    { context: 'Find the first file that starts with `_posts/`:' }
  ])
  .example([
    {
      multiple: true,
      path: '/^_posts\\//'
    },
    { context: 'Find all files that start with `_posts/`:' }
  ])
