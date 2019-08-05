<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `gate`

Decides if the next action(s) should be run, and if the step passes or fails.

## Examples

Check if the left and right values are equal:

```yaml
type: gate
left: hello
operator: ===
right: hello
```

Compare different values from the context of the action:

```yaml
type: gate
left: '%payload.sender.login%'
operator: ===
right: '%user.login%'
```

Use the `else` property to run actions if the condition is falsey:

```yaml
type: gate
left: '%payload.sender.login%'
operator: ===
right: '%user.login%'
else:
  - type: respond
    with: This returned false!
```

Test multiple conditions:

```yaml
type: gate
gates:
  - left: '%payload.sender.login%'
    operator: ===
    right: '%user.login%'
  - left: '%payload.sender.login%'
    operator: ===
    right: JasonEtco
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Left | `left` | The left side of the `if`. If no `operator` or `right` is present, this will be evaluated on its own. |  |  |
| Operator | `operator` | The conditional operator to use when evaluating the gate. |  |  |
| Right | `right` | The right side of the `if`. |  |  |
| Multiple gates | `gates` | Test against multiple conditions. |  |  |
| Require every gate to pass | `every` |  |  |  |
| Else | `else` | An action or list of actions to run if the gate fails. |  |  |

