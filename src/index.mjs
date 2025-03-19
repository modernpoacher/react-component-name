// @ts-nocheck

/**
 *  @typedef {import('@testing-library/react').RenderResult} RenderType
 *  @typedef {ReactComponentNameTypes.FiberNode} FiberNode
 */

import debug from 'debug'

import {
  REACT_PORTAL_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_PROFILER_TYPE,
  REACT_CONSUMER_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
  REACT_MEMO_TYPE,
  REACT_LAZY_TYPE,
  REACT_CLIENT_REFERENCE
} from './symbols.mjs'

import {
  FUNCTION_COMPONENT,
  CLASS_COMPONENT,
  HOST_ROOT,
  HOST_PORTAL,
  HOST_COMPONENT,
  HOST_TEXT,
  FRAGMENT,
  MODE,
  CONTEXT_CONSUMER,
  CONTEXT_PROVIDER,
  FORWARD_REF,
  PROFILER,
  SUSPENSE_COMPONENT,
  MEMO_COMPONENT,
  SIMPLE_MEMO_COMPONENT,
  LAZY_COMPONENT,
  DEYDRATED_FRAGMENT,
  SUSPENSE_LIST_COMPONENT,
  SCOPE_COMPONENT,
  OFFSCREEN_COMPONENT,
  CACHE_COMPONENT,
  TRACING_MARKER_COMPONENT,
  HOST_HOISTABLE,
  HOST_SINGLETON,
  THROW
} from './work-tags.mjs'

const log = debug('react-component-name')

/**
 *  @param {RenderType} render
 *  @returns {Element | null}
 */
export function getElementFromRender (render) {
  return (
    getElementFromContainerElement(
      getContainerElementFromRender(render)
    )
  )
}

/**
 *  @param {RenderType} render
 *  @returns {Element}
 */
export function getContainerElementFromRender (render) {
  const {
    container: containerElement
  } = render

  return containerElement
}

/**
 *  @param {Element} containerElement
 *  @returns {Element | null}
 */
function getElementFromContainerElement (containerElement) {
  const {
    firstElementChild: element = null
  } = containerElement

  return element
}

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
export function isReactFiberKey (key) {
  return String(key).startsWith('__reactFiber$')
}

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
export function isReactContainerFiberKey (key) {
  return String(key).startsWith('__reactContainer$')
}

/**
 *  @param {Element} element
 *  @returns {string | undefined}
 */
export function getReactFiberKey (element) {
  return (
    Object.keys(element)
      .find(isReactFiberKey)
  )
}

/**
 *  @param {Element} containerElement
 *  @returns {string | undefined}
 */
export function getReactContainerFiberKey (containerElement) {
  return (
    Object.keys(containerElement)
      .find(isReactContainerFiberKey)
  )
}

/**
 *  @param {RenderType} render
 *  @returns {FiberNode | null}
 */
export function getFiberFromRender (render) {
  const element = getElementFromRender(render)

  if (element) {
    return (
      getFiberFromElement(element)
    )
  }

  return null
}

/**
 *  @param {Element} element
 *  @returns {FiberNode | null}
 */
export function getFiberFromElement (element) {
  const key = getReactFiberKey(element)

  if (key) {
    const { // @ts-expect-error
      [key]: fiber = null
    } = element

    return fiber
  }

  throw new Error('Fiber is not found')
}

/**
 *  @param {Element} containerElement
 *  @returns {FiberNode | null}
 */
export function getContainerFiberFromContainerElement (containerElement) {
  const key = getReactContainerFiberKey(containerElement)

  if (key) {
    const { // @ts-expect-error
      [key]: fiber = null
    } = containerElement

    return fiber
  }

  throw new Error('Fiber is not found')
}

/**
 *  @param {{displayName?: string | null}} outerType
 *  @param {{displayName?: string | null, name?: string | null}} innerType
 *  @returns {string | null}
 */
function getComponentNameFromForwardRef (outerType, innerType) {
  const outerName = outerType.displayName || null

  if (outerName) return outerName

  const innerName = innerType.displayName || innerType.name || null

  if (innerName) return `ForwardRef(${innerName})`

  return 'ForwardRef'
}

/**
 *  @param {*} type
 *  @returns {string | null}
 */
export function getComponentNameFromFiberType (type) {
  if (type == null) return null

  if (typeof type === 'function') {
    return (
      type.$$typeof === REACT_CLIENT_REFERENCE
        ? null
        : type.displayName || type.name || null
    )
  }

  if (typeof type === 'string') return type

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment'

    case REACT_PORTAL_TYPE:
      return 'Portal'

    case REACT_PROFILER_TYPE:
      return 'Profiler'

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode'

    case REACT_SUSPENSE_TYPE:
      return 'Suspense'

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList'
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || 'Context') + '.Provider'

      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || 'Context') + '.Consumer'

      case REACT_FORWARD_REF_TYPE:
        return getComponentNameFromForwardRef(type, type.render)

      case REACT_MEMO_TYPE:
        return (
          type.displayName || getComponentNameFromFiberType(type.type) || 'Memo'
        )

      case REACT_LAZY_TYPE:
      {
        const {
          _payload: payload,
          _init: init
        } = type

        try {
          return getComponentNameFromFiberType(init(payload))
        } catch (e) {
          log(`Lazy Component error. Error was "${e}"`, e)
        }
      }
    }
  }

  return null
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {string | null}
 */
export function getComponentNameFromFiber (fiberNode) {
  const {
    tag,
    type
  } = fiberNode

  switch (tag) {
    case CACHE_COMPONENT:
      return 'Cache'

    case CONTEXT_CONSUMER:
      return (type._context.displayName || 'Context') + '.Consumer'

    case CONTEXT_PROVIDER:
      return (type.displayName || 'Context') + '.Provider'

    case DEYDRATED_FRAGMENT:
      return 'DehydratedFragment'

    case FORWARD_REF:
      return getComponentNameFromForwardRef(type, type.render, 'ForwardRef')

    case FRAGMENT:
      return 'Fragment'

    case HOST_HOISTABLE:
    case HOST_SINGLETON:
    case HOST_COMPONENT:
      return type

    case HOST_PORTAL:
      return 'Portal'

    case HOST_ROOT:
      return 'Root'

    case HOST_TEXT:
      return 'Text'

    case LAZY_COMPONENT:
      return getComponentNameFromFiberType(type)

    case MODE:
      return (
        type === REACT_STRICT_MODE_TYPE
          ? 'StrictMode'
          : 'Mode'
      )
    case OFFSCREEN_COMPONENT:
      return 'Offscreen'

    case PROFILER:
      return 'Profiler'

    case SCOPE_COMPONENT:
      return 'Scope'

    case SUSPENSE_COMPONENT:
      return 'Suspense'

    case SUSPENSE_LIST_COMPONENT:
      return 'SuspenseList'

    case TRACING_MARKER_COMPONENT:
      return 'TracingMarker'

    case CLASS_COMPONENT:
    case FUNCTION_COMPONENT:
    case MEMO_COMPONENT:
    case SIMPLE_MEMO_COMPONENT:
      if (typeof type === 'function') return type.displayName || type.name || null
      if (typeof type === 'string') return type
      return null

    case THROW:
    {
      const info = fiberNode._debugInfo || null

      if (info != null) {
        let i = info.length - 1

        for (i; i >= 0; i--) {
          const t = info[i]
          const n = t.name

          if (typeof n === 'string') return n
        }
      }

      if (fiberNode.return !== null) return getComponentNameFromFiber(fiberNode.return)
    }
  }

  return null
}

/**
 *  @param {RenderType | null} render
 *  @returns {string | null}
 */
export function getComponentNameFromRender (render) {
  if (render) {
    const fiberNode = getFiberFromRender(render)

    if (fiberNode) {
      return (
        getComponentNameFromFiber(fiberNode)
      )
    }
  }

  return null
}

/**
 *  @param {Element | null} element
 *  @returns {string | null}
 */
export function getComponentNameFromElement (element) {
  if (element instanceof HTMLElement) {
    const fiberNode = getFiberFromElement(element)

    if (fiberNode) {
      return (
        getComponentNameFromFiber(fiberNode)
      )
    }
  }

  return null
}

/**
 *  @param {Element | null} containerElement
 *  @returns {string | null}
 */
export function getComponentNameFromContainerElement (containerElement) {
  if (containerElement instanceof HTMLElement) {
    const element = getElementFromContainerElement(containerElement)

    if (element instanceof HTMLElement) {
      const fiberNode = getFiberFromElement(element)

      if (fiberNode) {
        return (
          getComponentNameFromFiber(fiberNode)
        )
      }
    }
  }

  return null
}
