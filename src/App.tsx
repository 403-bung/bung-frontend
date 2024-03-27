import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Routes/login";
import Confirm from "./Routes/login/confirm";
import NicknamePage from "./pages/Nickname";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/login/confirm", element: <Confirm /> },
  { path: "/nickname", element: <NicknamePage /> },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function App() {
  return (
    <>
      <Provider store={store}>
        <div className="bg-black w-full min-h-screen flex justify-center">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}
