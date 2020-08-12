import logger from 'redux-logger';
import loopObject from 'loopobject';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createActionsFromReducer } from 'redux-wow';
import { rootStore } from './rootStore';
import { setActions } from './actions';

const reduxDevTool = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

const isNonProd = process.env.NODE_ENV !== 'production';

const composeEnhancers = (typeof window !== 'undefined' && window[reduxDevTool]) || compose;

const middlewares = [];
if (isNonProd) {
  middlewares.push(logger);
}

export const store = createStore(
  combineReducers(rootStore),
  composeEnhancers(applyMiddleware(...middlewares))
);

loopObject(rootStore, (s) => {
  setActions(s.namespace, createActionsFromReducer(s, store.dispatch));
});
