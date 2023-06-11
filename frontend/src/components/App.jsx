import { React, useEffect, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import uniqid from "uniqid";
import { useCookies } from "react-cookie";

function App() {
  useEffect(() => {
    // eslint-disable-next-line
    checkAdmin();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useCookies(["userSaved", "username", "password"]);
  const [checkForCookies, setCheckForCookies] = useState(true);
  const [User, setUser] = useState();

  if (checkForCookies === true && cookie.userSaved === "true") {
    setCheckForCookies(false);
    const requestPayload = {
      username: cookie.username,
      cookieID: cookie.cookieID,
    };
    fetch("http://127.0.0.1:8000/retain-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(requestPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload.message === 200) {
          console.log("Session Retained");
          setIsLoggedIn(true);
          updateUser(payload.user);
        } else {
          console.log("Something went wrong");
          console.log(payload.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function updateUser(user) {
    let setResolve = false;
    return new Promise((resolve, reject) => {
      setCookie("userSaved", true);
      setCookie("username", user.username);
      setCookie("cookieID", user.cookieID);
      setUser(() => {
        setResolve = true;
        return { ...user };
      });
      if (setResolve === true) {
        resolve();
      }
    });
  }

  function logOut() {
    setIsLoggedIn(false);
    setUser({});
    setCookie("userSaved", false);
    setCookie("username", "");
    setCookie("password", "");
    setCookie("cookieID", "");
  }

  function checkAdmin() {
    fetch("http://127.0.0.1:8000/check-admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    const payload = new FormData(e.currentTarget);
    const reqPayload = {
      username: payload.get("username"),
      password: payload.get("password"),
      cookieID: uniqid(),
    };
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log(payload);
        if (payload.message === 200) {
          console.log("Login Successful");
          setIsLoggedIn(true);
          updateUser(payload.user);
        } else {
          console.log("Something went wrong");
          console.log(payload.message);
        }
      });
  }

  return isLoggedIn ? (
    <div className="App">
      <Header />
      <Footer />
    </div>
  ) : (
    <Login handleLogin={handleLogin} />
  );
}

export default App;
