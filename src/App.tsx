import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "Routes/login";
import Confirm from "Routes/login/confirm";
import NicknamePage from "pages/Nickname";
import "App.css";
import Home from "pages/Home";
import { Provider } from "react-redux";
import store from "store";
import Detail from "Routes/detail";
import Write from "pages/Write";
import My from "pages/My";
import ChangePwd from "pages/ChangePwd";
import Intro from "pages/Intro";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditWritePage from "pages/EditWritePage";

import ActivityModal from "./components/ActivityModal";
import Review from "./pages/Review";

import DraftModal from "components/write/DraftModal";
import DraftArticle from "pages/DraftArticle";
import Activity from "pages/Activity";
import FinishReview from "pages/FinishReview";
import UserReview from "pages/UserReview";

const router = createBrowserRouter([
  { path: "/review/:articleNo/:userNo", element: <UserReview /> },
  { path: "/finishreview/:articleNo", element: <FinishReview /> },
  { path: "/activityModal", element: <ActivityModal /> },
  { path: "/review/:articleNo", element: <Review /> },
  { path: "/draftModal", element: <DraftModal /> },
  { path: "/draft", element: <DraftArticle /> },
  { path: "/", element: <Intro /> },
  { path: "/login", element: <Login /> },
  { path: "/login/confirm", element: <Confirm /> },
  { path: "/nickname", element: <NicknamePage /> },
  { path: "/detail/:articleNo", element: <Detail /> },
  { path: "/detail/:articleNo/edit", element: <EditWritePage /> },
  {
    path: "/home",
    element: <Home />,
  },
  { path: "/home/:category", element: <Home /> },
  { path: "/write", element: <Write /> },
  {
    path: "/my",
    element: <My />,
    children: [
      { path: "/my/timeline", element: <></> },
      { path: "/my/manner", element: <></> },
    ],
  },
  { path: "/my/changePwd", element: <ChangePwd /> },
  {
    path: "/activity/:articleNo",
    element: <Activity />,
    children: [
      { path: "/activity/:articleNo/timeline", element: <></> },
      { path: "/activity/:articleNo/manner", element: <></> },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Provider store={store}>
            <div className="bg-black w-full min-h-screen flex justify-center">
              <RouterProvider router={router} />
            </div>
          </Provider>
        </CookiesProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
