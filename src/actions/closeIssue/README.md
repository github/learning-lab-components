<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `closeIssue`

Closes an issue on GitHub.

## Examples

Use the issue from the webhook payload:

```yaml
type: closeIssue
```

Use the title of an issue:

```yaml
type: closeIssue
issue: Title of an issue
```

Use an issue number:

```yaml
type: closeIssue
issue: 4
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Issue | `issue` | The number or title of the issue to close. |  |  |

