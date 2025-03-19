# react-component-name

Get a React component name from its `DOM` element

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

describe('`getComponentNameFromRender`', () => {
  it('gets the component name from `render`' () => {
    expect(getComponentNameFromRender(render(
      <Component />
    )))
      .toBe('div')
  })
})

describe('`getComponentNameFromContainerElement`', () => {
  it('gets the component name from the component container element' () => {
    const {
      container
    } = render(
      <Component />
    )

    expect(getComponentNameFromContainerElement(container))
      .toBe('div')
  })
})

describe('`getComponentNameFromElement`', () => {
  it('gets the component name from the component element' () => {
    const {
      container: {
        firstElementChild: element
      }
    } = render(
      <Component />
    )

    expect(getComponentNameFromElement(element))
      .toBe('div')
  })
})
```
