<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `requestReviewFromRegistrant`

Requests a Pull Request review from the registrant

## Examples

Use the title of a pull request:

```yaml
type: requestReviewFromRegistrant
pullRequest: A pull request
```

Use a pull request number:

```yaml
type: requestReviewFromRegistrant
pullRequest: 2
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Pull request | `pullRequest` | The number or title of the pull request to request a review. This will default to the pull request number from the trigger event. |  |  |

