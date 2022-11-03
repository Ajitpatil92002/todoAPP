export const ACTIONS = {
  FETCH_TODOS: "FETCH_TODOS",
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  Mark_Completed: "Mark_Completed",
};

export const INITIAL_STATE = {
  Todos: [],
};

export const Reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TODOS:
      let initialTodos = [
        {
          _id: "6361de7fda4a79db4f8ed0a0abc",
          title: "👆 Add Your Task ...",
          user: "6360d1ef8685c66ff9cdeda3",
          completed: false,
          date: "2022-11-02T03:05:35.987Z",
          delete: false,
          __v: 0,
        },
        {
          _id: "6361dec0da4a79db4f8ed0a2abc",
          title: "👈 Complete Your Task ...",
          user: "6360d1ef8685c66ff9cdeda3",
          completed: true,
          delete: false,
          date: "2022-11-02T03:06:40.283Z",
          __v: 0,
        },
        {
          _id: "6361deebda4a79db4f8ed0a4abc",
          title: "Delete Your Task  ... 👉",
          user: "6360d1ef8685c66ff9cdeda3",
          completed: false,
          delete: false,
          date: "2022-11-02T03:07:23.693Z",
          __v: 0,
        },
      ];
      initialTodos.push(...action.playload);
      return {
        Todos: initialTodos,
      };

    case ACTIONS.ADD_TODO:
      return {
        Todos: [...state.Todos, action.playload.todo],
      };

    case ACTIONS.REMOVE_TODO:
      const filteredTodos = state.Todos.filter((item) => {
        return item._id !== action.playload._id;
      });
      return {
        Todos: filteredTodos,
      };

    case ACTIONS.Mark_Completed:
      const updatedTodod = state.Todos.map((todo) =>
        todo._id === action.playload._id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        Todos: updatedTodod,
      };
    default:
      break;
  }
};
