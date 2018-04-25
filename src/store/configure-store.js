import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

/**
 * Wrap existing app with our redux provider.
 * @param store - The store with redux states
 * @param App - The app component to wrap
 * @returns {App}
 */
export const createStoreProvider = (store, App) => (
  <Provider store={store}>
    { App }
  </Provider>
)

/**
 * Create a store with epic middleware
 * @param initialState
 * @returns {Store}
 */
export const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
  ))
}

/**
 * Wrap app with provider and store.
 * @param appComponent
 * @param reducers
 * @param customMiddleware
 * @returns {App}
 */
const wrapStoreProviderWithApp = (store, appComponent) =>
  createStoreProvider(store, appComponent)

export default {
  store: configureStore,
  wrapStoreProviderWithApp,
}
