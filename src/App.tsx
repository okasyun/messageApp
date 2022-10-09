import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordReset from "./pages/PasswordReset";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import Header from "./components/Header";
const theme = createTheme();

const homeUrl = process.env.PUBLIC_URL;

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={homeUrl} element={<Home />} />
            <Route path={homeUrl + "/profile"} element={<Profile />} />
          </Route>
          <Route path={homeUrl + "/signup"} element={<Signup />} />
          <Route path={homeUrl + "/login"} element={<Login />} />
          <Route
            path={homeUrl + "/password-reset"}
            element={<PasswordReset />}
          />
          {/* <Route path="/*" element={<Page404 />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
