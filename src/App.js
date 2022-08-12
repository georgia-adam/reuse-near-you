import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Helmet } from "react-helmet";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ReUse Near You</title>
        <link rel="canonical" href="https://reuse-near-you.web.app/" />
      </Helmet>
      <header>
        <h1>ReUse Near You</h1>
      </header>
      <nav>
        <Link className="navText" to="/">
          Home
        </Link>

        {!isAuth ? (
          <Link className="navText" to="/login">
            Log In
          </Link>
        ) : (
          <>
            <Link className="navText" to="/createpost">
              Create Post
            </Link>
            <button className="navText logOut" onClick={signUserOut}>
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
