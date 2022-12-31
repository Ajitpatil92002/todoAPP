import React, { useContext, useState } from "react";
import { Delete_Todo_API, Edit_Todo_API } from "../apis/TodoAPI";
import TodoContext from "../context/TodoContext/TodoContext";
import { ACTIONS } from "../context/TodoContext/TodoReducers";
import useAuthContext from "../hooks/useAuthContext";

const Todoitems = ({ title, completed, id, deleteTodo }) => {
  const { user } = useAuthContext();
  const { dispatch } = useContext(TodoContext);
  const [Completed, setCompleted] = useState(completed);

  const handlechange = async () => {
    setCompleted(!Completed);
    await Edit_Todo_API({ completed: !completed, _id: id, token: user.Token });
    dispatch({ type: ACTIONS.Mark_Completed, playload: { _id: id } });
  };

  const handleDelete = async () => {
    await Delete_Todo_API({ _id: id, token: user.Token });
    dispatch({ type: ACTIONS.REMOVE_TODO, playload: { _id: id } });
  };

  return (
    <div>
      <div>
        <input
          className="hidden"
          type="checkbox"
          id={`${id}`}
          checked={Completed}
          onChange={handlechange}
        />
        <label
          className="flex items-center justify-between h-10 px-2 rounded hover:bg-gray-900"
          htmlFor={`${id}`}
        >
          <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 cursor-pointer border-gray-500 rounded-full">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-sm">{title}</span>
          <button
            className="cursor-pointer"
            disabled={!deleteTodo}
            onClick={handleDelete}
          >
            <i className="material-icons">delete</i>
          </button>
        </label>
      </div>
    </div>
  );
};

export default Todoitems;
