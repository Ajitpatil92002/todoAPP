import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <>
      <div className="conatiner max-auto flex justify-center items-center py-5 bg-gray-900 h-screen">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800 p-8">
            <h2 className="text-gray-200 text-lg mb-1 font-medium title-font">
              Register to the TODO APP
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              For Productive Work use TODO APP
            </p>
            {error && <p className="leading-relaxed mb-5 text-red-600">{error}</p>}
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-200">
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              disabled={isLoading}
              className="text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg"
            >
              Button
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
