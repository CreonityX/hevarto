import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NewsList } from "./pages/NewsList";
import { Article } from "./pages/Article";
import { Admin } from "./pages/Admin";
import { Investors } from "./pages/Investors";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

const isAdminSubdomain = window.location.hostname === "admin.hevarto.com";

const getRoutes = () => {
  if (isAdminSubdomain) {
    return [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: Admin },
          { path: "*", Component: Admin }, // Catch all for admin subdomain
        ],
      },
    ];
  }

  return [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "news", Component: NewsList },
        { path: "news/:id", Component: Article },
        { path: "investors", Component: Investors },
        { path: "privacy", Component: Privacy },
        { path: "terms", Component: Terms },
        { path: "admin", Component: Admin }, // Kept for local development testing
      ],
    },
  ];
};

export const router = createBrowserRouter(getRoutes());
