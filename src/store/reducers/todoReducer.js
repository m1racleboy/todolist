import moment from 'moment';
import { TodoActions } from '../actions/TodoActions';


const initialState = {
  todos: [
    {
      id: moment().format('DDMMYYYYHHmmss'),
      title: 'Сделать тестовоe',
      message: 'Чтобы проверить кейс при отсутствии todo, удалите этот todo :)',
      isComplete: true,
      date: 'November 7, 2021',
      isEditMode: false,
    },
  ],
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TodoActions.EDIT_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, state.todos.findIndex(todo => todo.id == action.payload.id)),
          action.payload,
          ...state.todos.slice(state.todos.findIndex(todo => todo.id == action.payload.id) + 1),
        ],
      };
    case TodoActions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id != action.payload),
      };
    case TodoActions.CHANGE_TODO_STATUS:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, state.todos.findIndex(todo => todo.id == action.payload.id)),
          action.payload,
          ...state.todos.slice(state.todos.findIndex(todo => todo.id == action.payload.id) + 1),
        ],
      };
    case TodoActions.CHANGE_MODE:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, state.todos.findIndex(todo => todo.id == action.payload.id)),
          {
            ...action.payload,
            isEditMode: !action.payload.isEditMode,
          },
          ...state.todos.slice(state.todos.findIndex(todo => todo.id == action.payload.id) + 1),
        ],
      };
    default: return state;
  }
};
