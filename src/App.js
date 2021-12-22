import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Header />
      <Toastify />
      <Layout>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/user" exact component={Feed} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/savedPosts" exact component={Saved} />
          <Route path="/createPost" exact component={Explore} />
          <Route path="/user/edit" exact component={EditUserInfo} />
          <Route path="/search_results" exact component={SearchResults} />
          <Route path="/user/followers" exact component={MapFollower} />
          <Route path="/user/following" exact component={MapFolllowing} />
          <Route path="/feed/post" exact component={Post} />
          <Route path="/user/dashboard" exact component={UserDashboard} />
        </Switch>
      </Layout>
    </div>
  );
}
export default App;
