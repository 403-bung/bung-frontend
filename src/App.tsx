import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import NicknamePage from "./pages/Nickname.tsx";

const router = createBrowserRouter([
  { path: "/nickname", element: <NicknamePage /> },
]);

function App() {
  return (
    <>
      <div className="bg-black w-full min-h-screen flex justify-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
