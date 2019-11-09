<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `htmlContainsTag`

Checks if the provided HTML string contains a specific HTML tag

## Examples

Check if the provided HTML code contains a `<div>` tag:

```yaml
type: htmlContainsTag
html: <html><div>Hello!</div></html>
tag: div
```

Check if the provided HTML code contains an `<img>` tag with an `src` attribute:

```yaml
type: htmlContainsTag
html: <html><img src="example.png" /></html>
tag: img
attribute: src
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| HTML | `html` | An HTML string to parse. This is often used in conjunction with `getFileContents`. |  | ✔ |
| HTML Tag | `tag` | The HTML tag to look for. |  | ✔ |
| Attribute | `attribute` | An optional HTML attribute to check for. |  |  |

