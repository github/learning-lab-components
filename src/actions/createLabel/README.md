<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `createLabel`

Creates a new label on GitHub.

## Examples

Create a new label:

```yaml
type: createLabel
name: a label
color: f87000
```

A description can also be included:

```yaml
type: createLabel
name: another label
color: f87000
description: This label is used to label things
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Name | `name` | The name of the label. |  | ✔ |
| Color | `color` | The color of the label, as a hex color code. |  | ✔ |
| Description | `description` | The description of the label. |  |  |

