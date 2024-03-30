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
import ChangePwd from "./pages/ChangePwd";
import Intro from "./pages/Intro";
import MypageLogin from "./pages/MypageLogin";

const loginToken = localStorage.getItem("key");
const myElement = localStorage.getItem("key") ? <My /> : <MypageLogin />;
const router = createBrowserRouter([
  { path: "/", element: <Intro /> },
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
  {
    path: "/my",
    element: myElement,
    children: [{ path: "/my/timeline" }, { path: "/my/manner" }],
  },
  { path: "/my/changePwd", element: <ChangePwd /> },
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
