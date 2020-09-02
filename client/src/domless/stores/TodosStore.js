import { createReducer } from 'redux-wow';
// import { actions } from './actions';

export const TodosStore = createReducer({
  namespace: 'TodosStore',
  initialState: {
    todos: []
  },
  addTodo(state, id, name, status) {
    state.todos.push({ id, name, status });
  },
  completeTodo(state, id) {
    state.todos.forEach((v) => {
      if (v.id === id) {
        v.status = true;
      }
    });
  }
});

/*
{
  type: '[TodosStore] editPropertyById',
  payload: []
}
*/

// const delay = () => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 2000);
//   });
// };

// setTimeout(async () => {
//   actions.TodosStore.addTodo('as34', 'Travel to Gao', false);
//   await delay();
//   actions.TodosStore.addTodo('b456', 'write book', false);
//   await delay();
//   actions.TodosStore.completeTodo('as34');
//   await delay();
// }, 2000);
