<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `findInTree`

Finds a file in a given tree, either by path or matching a RegEx

## Examples

Find the `example.md` file in the tree:

```yaml
type: findInTree
path: example.md
```

Find the first file that starts with `_posts/`:

```yaml
type: findInTree
path: /^_posts\//
```

Find all files that start with `_posts/`:

```yaml
type: findInTree
multiple: true
path: /^_posts\//
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Path or RegEx | `path` | The path or RegEx of the file you want to find. |  | ✔ |
| Tree | `tree` | A Git tree. This is often used in conjunction with `getTree`. |  |  |
| Multiple | `multiple` | Return an array of values instead of just the first one that matches. |  |  |

