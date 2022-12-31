import React, { useReducer } from "react";
import TodoContext from "./TodoContext";
import { INITIAL_STATE, Reducers } from "./TodoReducers";

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducers, INITIAL_STATE);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
