import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NicknamePage from "./pages/Nickname";
import "./App.css";

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
