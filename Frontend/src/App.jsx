import React from "react";
import { Button } from "./components/ui/button";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
