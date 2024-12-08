import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";

import "./App.css";
import CreatePost from "./Components/CreatePost";

import DisplayPostList from "./Components/DisplayPostList";
import Register from "./Components/Register";
import Login from "./Components/Login";

import PostListProvider from "./Store/post-list-store";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          <Header></Header>
          <Routes>
            <Route path="/" element={<DisplayPostList />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
};

export default App;
