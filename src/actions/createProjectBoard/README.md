<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createProjectBoard`

Creates a new Project Board in the user's repository

## Examples

Create a new project board:

```yaml
type: createProjectBoard
name: New board
```

Create a project board with a description and some columns:

```yaml
type: createProjectBoard
name: New board
description: This board is the best board
columns:
  - To do
  - In progress
  - Done
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Name | `name` | The name of the project board. |  | ✔ |
| Description | `description` | The description of the project board. |  |  |
| Columns | `columns` | A list of columns to create. |  |  |

