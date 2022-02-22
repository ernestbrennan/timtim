import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialData = {}) {
  const store = createStore(rootReducer, initialData, compose(applyMiddleware(sagaMiddleware), (f) => f));

  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);

  return { store, persistor };
}
