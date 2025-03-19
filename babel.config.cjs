const debug = require('debug')

const log = debug('react-component-name')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`react-component-name` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ],
  '@babel/react'
]

// @ts-ignore
module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets
  }
}
