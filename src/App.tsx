import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NicknamePage from "./pages/Nickname";
import "./App.css";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/nickname", element: <NicknamePage /> },
  {
    path: "/home",
    element: <Home />,
  },
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
