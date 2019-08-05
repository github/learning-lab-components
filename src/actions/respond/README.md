<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `respond`

Posts a comment on an issue or pull request

## Examples

Respond to the issue from the webhook event:

```yaml
type: respond
with: my-response.md
```

Use an issue title:

```yaml
type: respond
with: my-response.md
issue: Title of an issue to comment in
```

Use the number of an issue:

```yaml
type: respond
with: my-response.md
issue: 4
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| With | `with` | The name of the response file to use in the generated comment. |  | ✔ |
| Issue or pull request | `issue` | The number or title of the issue or pull request to comment on. This will default to the number from the trigger event. |  |  |
| Data | `data` | An object of data that will be used in the response template. This can include values from the webhook payload, information about the user, or values returned from previous actions in the same step. |  |  |

