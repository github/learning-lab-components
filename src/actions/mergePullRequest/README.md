<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `mergePullRequest`

Merges a Pull Request on GitHub.

## Examples

Use a pull request number:

```yaml
type: mergePullRequest
pullRequest: 1
```

Use the title of a pull request:

```yaml
type: mergePullRequest
pullRequest: An existing pull request
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Pull request | `pullRequest` | The number or title of the pull request to merge. This will default to the pull request number from the trigger event. |  |  |

