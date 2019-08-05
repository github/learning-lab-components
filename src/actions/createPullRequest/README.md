<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createPullRequest`

Opens a new Pull Request on GitHub.

## Examples

Create a pull request from the `this-branch` branch:

```yaml
type: createPullRequest
title: Title of the Pull Request
body: pull-request-body.md
head: this-branch
```

Create a pull request and create a comment on it:

```yaml
type: createPullRequest
title: Title of the Pull Request
body: pull-request-body.md
head: this-branch
comments:
  - pr-comment.md
```

Create a pull request to a specified `base` branch:

```yaml
type: createPullRequest
title: Title of the Pull Request
body: pull-request-body.md
head: this-branch
base: not-master
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Title | `title` | The title of the pull request. |  | ✔ |
| Body | `body` | The body of the pull request. |  | ✔ |
| Head branch | `head` | The head branch of the pull request. |  | ✔ |
| Base branch | `base` | The base branch of the pull request. This defaults to `master`. | `master` |  |
| Comments | `comments` | A list of response files that will be posted to the issue as comments upon creation. |  |  |
| Data | `data` | An object of data that will be used in the response template. This can include values from the webhook payload, information about the user, or values returned from previous actions in the same step. |  |  |

