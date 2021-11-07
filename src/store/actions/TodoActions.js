export const TodoActions = {
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  DELETE_TODO: 'DELETE_TODO',
  CHANGE_TODO_STATUS: 'CHANGE_TODO_STATUS',
  CHANGE_MODE: 'CHANGE_MODE',
};

export const addTodo = payload => ({ type: TodoActions.ADD_TODO, payload });
export const editTodo = payload => ({ type: TodoActions.EDIT_TODO, payload });
export const deleteTodo = payload => ({ type: TodoActions.DELETE_TODO, payload });
export const changeTodoStatus = payload => ({ type: TodoActions.CHANGE_TODO_STATUS, payload });
export const changeEditMode = payload => ({ type: TodoActions.CHANGE_MODE, payload });

