import { compose, createStore, applyMiddleware } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers'

export const configureStore = () => {
  const middlewares = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware({})
  middlewares.push(sagaMiddleware)

  // if (__DEV__) {
  //   if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger())
  //   }
  // }

  enhancers.push(autoRehydrate())

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), ...enhancers)
  )

  return store
}
