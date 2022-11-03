import React, { useContext, useState } from "react";
import { Create_Todo_API } from "../apis/TodoAPI";
import TodoContext from "../context/TodoContext/TodoContext";
import { ACTIONS } from "../context/TodoContext/TodoReducers";
import useAuthContext from "../hooks/useAuthContext";

const AddTodo = () => {
  const { user } = useAuthContext();
  const { dispatch } = useContext(TodoContext);
  const [todoValue, setTodoValue] = useState("");
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setTodoValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = todoValue.trim();
    if (value.length === 0) {
      setErr("Enter valid text");
      return;
    } else {
      let item = await Create_Todo_API(
        { title: todoValue, completed: false },
        user.Token
      );
      dispatch({
        type: ACTIONS.ADD_TODO,
        playload: {
          todo: item,
        },
      });
      setTodoValue("");
    }
  };
  return (
    <button className="flex items-center w-full h-8 px-2 mb-6 text-sm font-medium rounded">
      <svg
        className="w-5 h-5 text-gray-400 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <form onSubmit={handleSubmit}>
        <input
          value={todoValue}
          onChange={handleChange}
          className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium border-b-2 border-b-gray-300"
          type="text"
          minLength={3}
          maxLength={50}
          required
          placeholder="add a new task"
        />
      </form>
    </button>
  );
};

export default AddTodo;
