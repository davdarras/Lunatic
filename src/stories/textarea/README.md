# Textarea component

## Props

|      Props      |      Type      | Default value | Required | Description                             |
| :-------------: | :------------: | :-----------: | :------: | --------------------------------------- |
|       id        |     string     |       -       |    ✓     | Id of the textarea                      |
|      label      |     string     |       -       |    ✓     | Label of the textarea                   |
| preferences \*  |     array      | ["COLLECTED"] |          | Preferences to manage textarea response |
|   response \*   |     object     |      {}       |          | Response concerned by the component     |
|   placeholder   |     string     |      ""       |          | Placeholder of the textarea             |
|  handleChange   |      func      |       -       |    ✓     | Handler of the textarea                 |
|      rows       |     number     |       5       |          | Number of rows of the textarea          |
|    maxLength    | number, string |   Unlimited   |          | Maximum length of the textarea          |
|    readOnly     |      bool      |     false     |          | Is the textarea read only               |
|  labelPosition  |     string     |   "DEFAULT"   |          | Position of the textarea label          |
|    required     |      bool      |     false     |          | Is the textarea required                |
|     focused     |      bool      |     false     |          | Is the textarea focused                 |
| declarations \* |     array      |      [ ]      |          | Declarations of the textarea            |
|     tooltip     |      bool      |     false     |          | Tooltip of the textarea                 |
|      style      |     object     |      {}       |          | Style of the textarea                   |

- `preferences` props has to be an ordered array of `COLLECTED`, `FORCED` or `EDITED`
- `response` props has to be a shape of `{name: string, valueState: object}`
- `declarations` are documented in the `Declarations` component

## Styles

**Textarea** component has for classes `textarea-lunatic`.