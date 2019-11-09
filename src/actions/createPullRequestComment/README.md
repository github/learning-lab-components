<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createPullRequestComment`

Creates a comment on a pull request on GitHub

## Examples

Create the comment on the pull request from the webhook event:

```yaml
type: createPullRequestComment
body: suggested-changes.md
file: some-file.js
position: 5
```

Use the number of a pull request:

```yaml
type: createPullRequestComment
pullRequest: 10
body: suggested-changes.md
file: some-file.js
position: 5
```

Use a pull request title:

```yaml
type: createPullRequestComment
pullRequest: Some pull request
body: suggested-changes.md
file: some-file.js
position: 5
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Body | `body` | The body of the pull request comment. |  | ✔ |
| File | `file` | The name of the file to create the pull request comment on. |  | ✔ |
| Position | `position` | The position of the comment to be generated. This is the line number of the combined diff of the pull request. |  | ✔ |
| Pull request | `pullRequest` | The title or number of the pull request. If omitted, the comment will be created on the pull request from the trigger event. |  |  |
| Data | `data` | An object of data that will be used in the response template. This can include values from the webhook payload, information about the user, or values returned from previous actions in the same step. |  |  |

