import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AddLaboratory from "./pages/AddLaboratory";
import AllLaboratory from "./pages/AllLaboratory";

import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SubmitRoom from "./pages/SubmitRoom";
import Top from "./pages/Top";

const Layout = () => {
  return (
    <>
      <Header title="チャットアプリ" />
      <Outlet />
    </>
  );
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/submit-room" element={<SubmitRoom />}></Route>
          {/* <Route path="/chat-room" element={<ChatRoom />}></Route> */}
        </Route>
        <Route
          path="/all-laboratory/chat"
          element={<Chat room="qhcC7Whu5d3xqhQwDIIK" />}
        />
        <Route path="/top" element={<Top />} />
        <Route path="/all-laboratory" element={<AllLaboratory />} />
        <Route path="/add-laboratory" element={<AddLaboratory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
