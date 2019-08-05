<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `getPullRequest`

Gets a Pull Request from GitHub.

## Examples

Use a pull request number:

```yaml
type: getPullRequest
pullRequest: 1
```

Use the title of a pull request:

```yaml
type: getPullRequest
pullRequest: An existing pull request
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Pull request | `pullRequest` | The number or title of the pull request to get. This will default to the pull request number from the trigger event. |  |  |
| Wait until mergeable | `waitForMergeable` | Only move on to the next action when GitHub has calculated whether or not the pull request is mergeable. |  |  |

