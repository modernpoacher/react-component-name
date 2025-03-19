# react-component-name

Transform a React component to match its snapshot in Jest

```javascript
import snapshotOf from 'react-component-name'

const {
  container: {
    firstElementChild: element
  }
} = render(
  <Component />
)

expect(snapshotOf(element))
  .toMatchSnapshot()
```
