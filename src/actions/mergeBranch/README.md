<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `mergeBranch`

Merges a branch into another branch

## Examples

Merge `a-feature-branch` into the `master` branch:

```yaml
type: mergeBranch
head: a-feature-branch
```

Merge `a-feature-branch` into a specific branch:

```yaml
type: mergeBranch
head: a-feature-branch
base: release-one
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Head branch | `head` | The head branch to merge from. |  | ✔ |
| Base branch | `base` | The base branch to merge into. This defaults to `master`. | `master` |  |

