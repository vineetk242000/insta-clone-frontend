import React from "react";
import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/SignIn";
import Feed from "./screens/Feed";
import Dashboard from "./screens/Dashboard";
import Explore from "./screens/Explore";
import EditUserInfo from "./screens/EditInfo";
import SearchResults from "./screens/Search";
import MapFollower from "./screens/Followers";
import MapFolllowing from "./screens/Following";
import Post from "./screens/Post";
import Saved from "./screens/SavedPosts";
import UserDashboard from "./screens/User";
import Toastify from "./components/Snackbar";
import Header from "./components/Header";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const location = useLocation();
  const showHeader =
    location.pathname === "/login" ||
    location.pathname === "/register" ? null : (
      <Header />
    );

  return (
    <div>
      {showHeader}
      <Toastify />
      <Layout>
        <Switch>
          <Route path="/register" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
          <ProtectedRoutes
            path="/:userName/followers"
            component={MapFollower}
          />
          <ProtectedRoutes
            path="/:userName/followings"
            component={MapFolllowing}
          />
          <ProtectedRoutes path="/user/:userName" component={UserDashboard} />
          <ProtectedRoutes path="/post/:id" component={Post} />
          <ProtectedRoutes path="/dashboard" component={Dashboard} />
          <ProtectedRoutes path="/explore" component={Explore} />
          <ProtectedRoutes path="/savedPosts" component={Saved} />
          <ProtectedRoutes path="/createPost" component={Explore} />
          <ProtectedRoutes path="/accounts/edit" component={EditUserInfo} />
          <ProtectedRoutes path="/search_results" component={SearchResults} />
          <ProtectedRoutes path="/" component={Feed} />
        </Switch>
      </Layout>
    </div>
  );
}
export default App;
