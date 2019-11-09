<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createStatus`

Creates a status on a commit or pull request

## Examples

Use a conditional to determine the state:

```yaml
type: createStatus
state:
  left: true
  operator: ===
  right: false
failure:
  description: >-
    Your pull request needs a description in the body. Please edit the pull
    request to include a body.
  target_url: 'https://help.github.com/articles/editing-a-comment/'
success:
  description: Your pull request has a body description.
  target_url: >-
    https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request
```

Specify a context to be able to overwrite the status in a later action:

```yaml
type: createStatus
state: failure
context: my-special-context
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| State | `state` | The state of the status to create. |  | ✔ |
| Error | `error` |  |  |  |
| Pending | `pending` |  |  |  |
| Failure | `failure` |  |  |  |
| Success | `success` |  |  |  |
| Sha | `sha` | The commit sha to create the status for. This will default to the head commit from the webhook payload if available. |  |  |
| Context | `context` | A unique identifier for this status - this can be used to overwrite an existing status on the same sha. |  |  |

