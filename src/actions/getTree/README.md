<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `getTree`

Gets a Git tree at either a given sha or the head of master

## Examples

Get the tree at the current SHA:

```yaml
type: getTree
```

Get a recursive tree, to include files nested in directories:

```yaml
type: getTree
recursive: true
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Sha | `sha` | The commit sha to get the tree for. |  |  |
| Recursive | `recursive` | Include sub-paths, not just the top level directory. |  |  |

