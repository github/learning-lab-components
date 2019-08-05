<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `updateBranchProtection`

Updates the branch protection on a branch in the course repository

## Examples

Add branch protection to the `master` branch:

```yaml
type: updateBranchProtection
```

Set branch protection on `my-protected-branch`:

```yaml
type: updateBranchProtection
branch: my-protected-branch
```

Include specific branch protection settings:

```yaml
type: updateBranchProtection
enforce_admins: false
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Branch | `branch` | The name of the branch to update protection settings on. This defaults to `master`. | `master` |  |
| Enforce protection for admins | `enforce_admins` | If enabled, these protection settings will be enforced for repository admins. | `true` |  |
| Required status checks | `required_status_checks` | A list of status checks that are required before a pull request can be merged into this branch. |  |  |
| Required pull request reviews | `required_pull_request_reviews` |  |  |  |

