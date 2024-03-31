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
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  { path: `${process.env.REACT_APP_PUBLIC_URL}/`, element: <Intro /> },
  { path: `${process.env.REACT_APP_PUBLIC_URL}/login`, element: <Login /> },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/login/confirm`,
    element: <Confirm />,
  },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/nickname`,
    element: <NicknamePage />,
  },
  { path: `${process.env.REACT_APP_PUBLIC_URL}/detail`, element: <Detail /> },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/home`,
    element: <Home />,
  },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/home/:category`,
    element: <Home />,
  },
  { path: `${process.env.REACT_APP_PUBLIC_URL}/write`, element: <Write /> },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/my`,
    element: <My />,
    children: [
      { path: `${process.env.REACT_APP_PUBLIC_URL}/my/timeline` },
      { path: `${process.env.REACT_APP_PUBLIC_URL}/my/manner` },
    ],
  },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/my/changePwd`,
    element: <ChangePwd />,
  },
]);

export default function App() {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <div className="bg-black w-full min-h-screen flex justify-center">
            <RouterProvider router={router} />
          </div>
        </Provider>
      </CookiesProvider>
    </>
  );
}
