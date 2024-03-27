import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Routes/login";
import Confirm from "./Routes/login/confirm";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "login/confirm", element: <Confirm /> },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
