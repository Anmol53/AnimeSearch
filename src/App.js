import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loginForm, setLoginForm] = useState(true);

  const serverURL = "https://anime-search-backend.herokuapp.com";

  const getUserDetail = (url, cred) => {
    fetch(`${serverURL}/userDetails`, {
      credentials: "include"
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((r) => ({ success: true, res_body: r }));
        } else {
          return r.json().then((r) => ({ success: false, res_body: r }));
        }
      })
      .then((r) => {
        if (r.success) {
          setLoggedUser(r.res_body.user);
          console.log(loggedUser);
        } else {
          setLoggedUser(undefined);
        }
      });
  };

  const loginSignupHandler = (endpoint, cred) => {
    console.log(`${serverURL}/${endpoint}`);

    // Try Login Here
    fetch(`${serverURL}/${endpoint}`, {
      method: "post",
      mode: "no-cors",
      body: JSON.stringify(cred),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success) {
          getUserDetail();
          setError(undefined);
        } else {
          setLoggedUser(undefined);
          setError(r.message);
        }
      });
  };

  return (
    <div>
      {/* <Home /> */}
      {loginForm ? (
        <Login
          loginHandler={loginSignupHandler}
          error={error}
          formToggler={setLoginForm}
        />
      ) : (
        <Signup
          signupHandler={loginSignupHandler}
          error={error}
          formToggler={setLoginForm}
        />
      )}{" "}
    </div>
  );
}
