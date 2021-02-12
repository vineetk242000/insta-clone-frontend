import React from 'react';
import './App.css'
import { Route , Switch} from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp"
import LogIn from './components/LogIn/LogIn';
import Feed from './components/Feed/Feed';
import Dashboard from './components/Dashboard/Dashboard';
import Explore from './components/Explore/Explore';
import EditUserInfo from './components/Edit_Info/edit_info';
import SearchResults from './components/Search/search';
import MapFollower from './components/Followers/followers';
import MapFolllowing from './components/Followers/following';
import Post from './components/Post/post';
import Saved from './components/Saved/savedPost';
import UserDashboard from './components/User/user'


function App() {
 
  return(
    <div>
        <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/user" exact  component={Feed} />
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
      </div>
        
       
    )
}
export default App;
