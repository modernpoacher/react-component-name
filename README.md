# react-component-name

Get a React component name from its rendered element

_These examples use **Testing Library** but you can also get the component name from any rendered element with `getComponentNameFromElement` or from its `Fiber` node with `getComponentNameFromFiber`_

```javascript
import {
  getComponentNameFromRender,
  getComponentNameFromContainerElement,
  getComponentNameFromElement
} from 'react-component-name'

import {
  render
} from '@testing-library/react'

function Component () {
  return <div />
}

expect(getComponentNameFromRender(render(
  <Component />
)))
  .toBe('div')

const {
  container
} = render(
  <Component />
)

expect(getComponentNameFromContainerElement(container))
  .toBe('div')

const {
  container: {
    firstElementChild: element
  }
} = render(
  <Component />
)

expect(getComponentNameFromElement(element))
  .toBe('div')
```
