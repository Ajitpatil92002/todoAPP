import React, { useContext, useEffect } from "react";
import AddTodo from "./AddTodo";
import Profile from "./Profile";
import Todoitems from "./Todoitems";
import TodoContext from "../context/TodoContext/TodoContext";
import { ACTIONS } from "../context/TodoContext/TodoReducers";
import { Get_Todos_API } from "../apis/TodoAPI";
import useAuthContext from "../hooks/useAuthContext";

const Todos = () => {
  const { user } = useAuthContext();
  const { state, dispatch } = useContext(TodoContext);
  useEffect(() => {
    async function fetchData() {
      const data = await Get_Todos_API(user.Token);
      dispatch({ type: ACTIONS.FETCH_TODOS, playload: data });
    }
    user && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-900 h-screen">
      <div className="flex items-center justify-center font-medium">
        <div className="bg-gray-900 h-full mt-5">
          <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg md:w-96 text-gray-200">
            <Profile />
            <AddTodo />
            {state.Todos?.map((todo) => {
              return (
                <Todoitems
                  key={todo._id}
                  title={todo.title}
                  completed={todo.completed}
                  deleteTodo={todo.delete}
                  id={todo._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
