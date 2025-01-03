import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./componants/Layout/Layout";
import SingUp from "./pages/SingUp/SingUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import UserProvuder from "./context/user.context";
import ProductedRoute from "./componants/ProductedRoute/ProductedRoute";
import GuestRoute from "./componants/GuestRoute/GuestRoute";
import NoteProvider from "./context/note.context";
import GetStart from "./pages/GetStart/GetStart";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProductedRoute>
          <Layout />
        </ProductedRoute>
      ),
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "getstart", element: <GetStart /> },
        { path: "singup", element: <SingUp /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <UserProvuder>
        <NoteProvider>
          <RouterProvider router={routes}></RouterProvider>
        </NoteProvider>
      </UserProvuder>
    </>
  );
}
