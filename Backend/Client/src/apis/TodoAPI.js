import Base_Url from "../config";

const url = "http://localhost:5000/api/todos";
export const Get_Todos_API = async (token) => {
  let response = await fetch(`${Base_Url}/api/todos`, {
    method: "GET",
    headers: {
      authtoken: token,
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data.data;
};

export const Create_Todo_API = async (todo, token) => {
  let bodyContent = JSON.stringify(todo);

  let response = await fetch(`${Base_Url}/api/todos/createTodo`, {
    method: "POST",
    body: bodyContent,
    headers: {
      authtoken: token,
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data.data;
};

export const Edit_Todo_API = async ({ completed, _id, token }) => {
  let bodyContent = JSON.stringify({
    completed: completed,
  });

  let response = await fetch(`${Base_Url}/api/todos"/edit/${_id}`, {
    method: "PUT",
    body: bodyContent,
    headers: {
      authtoken: token,
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data;
};

export const Delete_Todo_API = async ({ _id, token }) => {
  let response = await fetch(`${Base_Url}/api/todos"/delete/${_id}`, {
    method: "DELETE",
    headers: {
      authtoken: token,
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data;
};
