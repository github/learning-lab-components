<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `removeBranchProtection`

Removes the branch protection on a branch in the course repository

## Examples

Remove branch protection from the `master` branch:

```yaml
type: removeBranchProtection
```

Remove branch protection from a specific branch:

```yaml
type: removeBranchProtection
branch: my-protected-branch
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Branch | `branch` | The name of the branch to remove protection from. This defaults to `master`. | `master` |  |

