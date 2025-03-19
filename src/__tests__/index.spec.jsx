/**
 *  @typedef {ReactComponentNameTypes.FiberNode} FiberNode
 *  @typedef {import('@testing-library/react').RenderResult} RenderResult
 */

import React from 'react'

import '@testing-library/jest-dom'
import {
  render
} from '@testing-library/react'

import {
  getComponentNameFromRender,
  getContainerElementFromRender,
  getElementFromRender,
  getComponentNameFromContainerElement,
  getComponentNameFromElement,
  getFiberFromRender,
  getComponentNameFromFiber
} from '#react-component-name'

describe('#react-component-name', () => {
  function Component () {
    return <div />
  }

  describe('`getComponentNameFromRender`', () => {
    it('gets the component name from the render', () => {
      expect(getComponentNameFromRender(render(
        <Component />
      )))
        .toBe('div')
    })
  })

  describe('`getComponentNameFromContainerElement`', () => {
    it('gets the component name from the container element', () => {
      expect(getComponentNameFromContainerElement(getContainerElementFromRender(render(
        <Component />
      ))))
        .toBe('div')
    })
  })

  describe('`getComponentNameFromElement`', () => {
    it('gets the component name from the element', () => {
      expect(getComponentNameFromElement(getElementFromRender(render(
        <Component />
      ))))
        .toBe('div')
    })
  })

  describe('`getComponentNameFromFiber`', () => {
    it('gets the component name from the element', () => {
      /**
       *  `getFiberFromRender` can return either a `Fiber` node or `null`
       */
      const fiberNode = getFiberFromRender(render(
        <Component />
      ))

      if (fiberNode) {
        expect(getComponentNameFromFiber(fiberNode))
          .toBe('div')
      }
    })
  })
})
