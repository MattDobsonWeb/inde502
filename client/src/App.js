import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// import { clearCurrentProfile } from "./actions/profileActions";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

// Import Route Components
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import AppContainer from "./AppContainer";

// Import Components
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Posts from "./components/posts/Posts";
import Movie from "./components/movie/Movie";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/edit-profile/EditProfile";
import Notifications from "./components/notifications/Notifications";
import FollowingPosts from "./components/following/FollowingPosts";
import Search from "./components/search/Search";
import Admin from "./components/admin/Admin";
import RegisterLogin from "./components/auth/RegisterLogin";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

// Set Up Routes and Default Visuals
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppContainer>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Posts} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/media/:media/:movie_id" component={Movie} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/register-login" component={RegisterLogin} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/following-feed"
                  component={FollowingPosts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/notifications"
                  component={Notifications}
                />
              </Switch>
              <Switch>
                <AdminRoute exact path="/admin" component={Admin} />
              </Switch>
            </div>
          </AppContainer>
        </Router>
      </Provider>
    );
  }
}

export default App;
