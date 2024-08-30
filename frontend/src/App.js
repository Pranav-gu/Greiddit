import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Home from "./components/Home";
import Profile from "./components/Profile";
import "./App.css";
import Profile_Followers from "./components/Profile_Followers";
import Profile_Following from "./components/Profile_Following";
import My_subgreiddits from "./components/My_subgreiddits";
import Subgreiddits from "./components/Subgreiddits";
import Initial_Followers from "./components/Initial_Followers";
import Subgreiddits_users from "./components/Subgreiddits_users";
import Subgreiddits_join_req from "./components/Subgreiddits_join_req";
import Subgreiddits_stats from "./components/Subgreiddits_stats";
import Subgreiddits_reported_page from "./components/Subgreiddits_reported_page";
import Subgreiddits_Page from "./components/Subgreiddits_Page";
import Subgreiddits_profile from "./components/Subgreiddits_profile";
import Saved_posts from "./components/Saved_posts";
// import Axios from "axios";j

const ErrorPage = () => {
  return (
    <h1 className="text-center" style={{"marginTop": "20%"}}>404 ERROR PAGE</h1>
  );
};

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(JSON.parse(localStorage.getItem('is-open')) || false);
  const logIn = () => {
    localStorage.setItem('is-open', JSON.stringify(true));
    setisLoggedIn(true);
  }

  const logOut = () => {
    localStorage.setItem('is-open', JSON.stringify(false));
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("uname");
    localStorage.removeItem("age");
    localStorage.removeItem("contact");
    localStorage.removeItem("password");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setisLoggedIn(false);
  }


  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Home />}/>} />
          <Route path='/profile'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Profile />}/>
              </Protected>
            }
          />
          <Route path='/followers'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Profile_Followers />}/>
              </Protected>
            }
          />
          <Route path='/followers'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Initial_Followers />}/>
              </Protected>
            }
          />
          <Route path='/following'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Profile_Following />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits_page'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_Page />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits/:id'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits/:id/users'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_users />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits_page/:id/profile'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_profile />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits/:id/joining_requests'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_join_req />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits/:id/stats'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_stats />}/>
              </Protected>
            }
          />
          <Route path='/subgreiddits/:id/reported_page'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Subgreiddits_reported_page />}/>
              </Protected>
            }
          />
          <Route path='/my_subgreiddits'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<My_subgreiddits />}/>
              </Protected>
            }
          />
          <Route path='/saved_posts'
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Navbar isLoggedIn={isLoggedIn} logOut={logOut} logIn={logIn} children={<Saved_posts />}/>
              </Protected>
            }
          />
          <Route path = "*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;