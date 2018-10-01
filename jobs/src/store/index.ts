import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { AsyncStorage } from 'react-native'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['like']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store
