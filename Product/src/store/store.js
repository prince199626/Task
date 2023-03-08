import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(authReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;