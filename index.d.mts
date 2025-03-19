import type React from 'react'

declare global {
  namespace ReactComponentNameTypes {
    /**
     *  React constants
     */
    export type RootWorkTag = 0 | 1

    /**
     *  React constants
     */
    export type WorkTag = (
      0 |
      1 |
      2 |
      3 |
      4 |
      5 |
      6 |
      7 |
      8 |
      9 |
      10 |
      11 |
      12 |
      13 |
      14 |
      15 |
      16 |
      17 |
      18 |
      19 |
      20 |
      21 |
      22 |
      23 |
      24 |
      25 |
      26 |
      27 |
      28 |
      29 |
      30 |
      31
    )

    /**
     *  https://github.com/bendtherules/react-fiber-traverse
     */
    export type FiberNode =
      | FiberNodeForClassComponent
      | FiberNodeForFunctionComponent
      | FiberNodeForInstrinsicElement
      | FiberNodeForTextNode

    interface FiberType {
      child: FiberNode | null
      sibling: FiberNode | null

      tag: WorkTag
      return?: FiberRootNode | FiberNode
    }

    export interface FiberRootNode extends FiberType {
      child: FiberNode

      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: {
        current: FiberRootNode
      }
      return?: FiberRootNode
    }

    export interface FiberNodeForFunctionComponent extends FiberType {
      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: null
    }

    export interface FiberNodeForClassComponent extends FiberType {
      elementType: React.ComponentClass
      type: React.ComponentClass

      stateNode: React.Component
    }

    export interface FiberNodeForInstrinsicElement extends FiberType {
      elementType: keyof React.JSX.IntrinsicElements
      type: keyof React.JSX.IntrinsicElements

      stateNode: HTMLElement
    }

    export interface FiberNodeForTextNode extends FiberType {
      child: null

      elementType: null
      type: null

      stateNode: Text
    }
  }
}

export {}
