import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NewsList } from "./pages/NewsList";
import { Article } from "./pages/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "news", Component: NewsList },
      { path: "news/:id", Component: Article },
    ],
  },
]);
