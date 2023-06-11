import React from "react";

function Login(props) {
  return (
    <div className="container text-center py-4">
      <main className="form-signin w-25 m-auto login-form">
        <form onSubmit={props.handleLogin} method="POST">
          <img
            className="mb-4"
            src={require("../icons8-book.gif")}
            alt="Book Logo"
            width="100"
            height="100"
          />
          <h1 className="h3 mb-3 fw-normal">Library</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              name="username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 my-4 py-2" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
