import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NicknamePage from "./pages/Nickname";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";

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
      <Provider store={store}>
        <div className="bg-black w-full min-h-screen flex justify-center">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

export default App;
