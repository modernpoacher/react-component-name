import type {
  RenderResult as RenderType
} from '@testing-library/react'

type FiberNode = ReactComponentNameTypes.FiberNode

export function getElementFromRender (render: RenderType): Element | null

export function getContainerElementFromRender (render: RenderType): Element

declare function getElementFromContainerElement (containerElement: Element): Element | null

export function isReactFiberKey (key: PropertyKey): boolean

export function isReactContainerFiberKey (key: PropertyKey): boolean

export function getReactFiberKey (element: Element): string | undefined

export function getReactContainerFiberKey (containerElement: Element): string | undefined

export function getFiberFromRender (render: RenderType): FiberNode | null

export function getFiberFromElement (element: Element): FiberNode | null

export function getContainerFiberFromContainerElement (containerElement: Element): FiberNode | null

interface OuterType { displayName?: string | null }
interface InnerType { displayName?: string | null; name?: string | null }

declare function getComponentNameFromForwardRef (outerType: OuterType, innerType: InnerType): string | null

export function getComponentNameFromFiberType (type: unknown): string | null

export function getComponentNameFromFiber (fiberNode: FiberNode): string | null

export function getComponentNameFromRender (render: RenderType | null): string | null

export function getComponentNameFromElement (elemen: Element | null): string | null

export function getComponentNameFromContainerElement (containerElement: Element | null): string | null
