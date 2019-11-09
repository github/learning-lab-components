<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createReview`

Creates a Pull Request review on GitHub

## Examples

Create a review on the pull request from the webhook event:

```yaml
type: createReview
body: review-body.md
event: REQUEST_CHANGES
```

Use the number of a pull request:

```yaml
type: createReview
body: review-body.md
event: REQUEST_CHANGES
pullRequest: 3
```

Use a pull request title:

```yaml
type: createReview
body: review-body.md
event: REQUEST_CHANGES
pullRequest: A pull request
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Body | `body` | A response file for the body of the review. |  | ✔ |
| Event | `event` | The type of review to create. |  | ✔ |
| Number (deprecated) | `number` | The number of the pull request. |  |  |
| Pull request | `pullRequest` | The title or number of the pull request. If omitted, the comment will be created on the pull request from the trigger event. |  |  |
| Data | `data` | An object of data that will be used in the response template. This can include values from the webhook payload, information about the user, or values returned from previous actions in the same step. |  |  |

