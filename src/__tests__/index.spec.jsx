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
} from '#react-component-name'

describe('#react-component-name', () => {
  describe('`getComponentNameFromRender`', () => {
    it('gets the component name from the render', () => {
      class Component extends React.Component {
        render () {
          return (
            <div className='1'>
              <div className='2'>
                <div className='3'>
                  TEXT
                </div>
              </div>
            </div>
          )
        }
      }

      expect(getComponentNameFromRender(render(
        <Component />
      )))
        .toBe('div')
    })
  })

  describe('`getComponentNameFromContainerElement`', () => {
    it('gets the component name from the container element', () => {
      class Component extends React.Component {
        render () {
          return (
            <div className='1'>
              <div className='2'>
                <div className='3'>
                  TEXT
                </div>
              </div>
            </div>
          )
        }
      }

      expect(getComponentNameFromContainerElement(getContainerElementFromRender(render(
        <Component />
      ))))
        .toBe('div')
    })
  })

  describe('`getComponentNameFromElement`', () => {
    it('gets the component name from the element', () => {
      class Component extends React.Component {
        render () {
          return (
            <div className='1'>
              <div className='2'>
                <div className='3'>
                  TEXT
                </div>
              </div>
            </div>
          )
        }
      }

      expect(getComponentNameFromElement(getElementFromRender(render(
        <Component />
      ))))
        .toBe('div')
    })
  })
})
