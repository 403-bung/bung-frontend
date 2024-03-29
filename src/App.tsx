import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Routes/login";
import Confirm from "./Routes/login/confirm";
import NicknamePage from "./pages/Nickname";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";
import Detail from "./Routes/detail";
import Write from "./pages/Write";
import My from "./pages/My";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/login/confirm", element: <Confirm /> },
  { path: "/nickname", element: <NicknamePage /> },
  { path: "/detail", element: <Detail /> },
  {
    path: "/home",
    element: <Home />,
  },
  { path: "/home", element: <Home /> },
  { path: "/write", element: <Write /> },
  { path: "/my", element: <My /> },
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
