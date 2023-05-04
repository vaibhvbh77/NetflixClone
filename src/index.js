import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap-scss/bootstrap.scss";
import {
  createBrowserRouter,
  createHashRouter,
  HashRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Login from "./components/Login";
import List from "./components/List";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Banner />
        <List title="Netflix Originals" param="originals" />
        <List title="Trending Now" param="trending" />
        <List title="Now Playing" param="now_playing" />
        <List title="popular" param="popular" />
        <List title="Top Rated" param="top_rated" />
        <List title="Upcoming" param="upcoming" />
      </>
    ),
  },
]);
root.render(<RouterProvider router={appRouter}></RouterProvider>);

reportWebVitals();
