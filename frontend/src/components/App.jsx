import { React, useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    const payload = new FormData(e.currentTarget);
    const reqPayload = {
      username: payload.get("username"),
      password: payload.get("password"),
    };
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(reqPayload),
    }).then((res) => {
      if (res.status === 200) {
        console.log("Login Successful");
        setIsLoggedIn(true);
      } else {
        console.log("Something went wrong");
        console.log(res.status);
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
