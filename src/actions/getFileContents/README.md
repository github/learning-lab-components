<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `getFileContents`

Gets the contents of a file at a specific commit.

## Examples

Get the contents of a file:

```yaml
type: getFileContents
filename: README.md
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| File name | `filename` | Name of the file to retrieve. |  | ✔ |
| Sha | `sha` | The commit sha at which to retrieve the file contents. This will default to the head commit sha from the pull request or push payload. |  |  |

