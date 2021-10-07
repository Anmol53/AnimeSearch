import { useEffect, useState } from "react";
import styled from "styled-components";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const UserInfo = styled.div`
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;

  p {
    color: #1c0c5b;
    font-size: 1.2rem;
  }

  button {
    outline: none;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #916bbf;
    color: white;
    font-weight: 600;
  }

  button:hover {
    background-color: #ff0040;
  }

  button:active {
    background-color: #ff4d79;
  }
`;

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
    // Try Login Here
    setError(undefined);
    fetch(`${serverURL}/${endpoint}`, {
      method: "post",
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

  const logout = () => {
    fetch(`${serverURL}/logout`, { credentials: "include" }).then((r) => {
      if (r.ok) {
        setLoggedUser(undefined);
      }
    });
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div>
      {loggedUser ? (
        <UserInfo>
          <span></span>
          <p>Hi {loggedUser.user_name}!</p>
          <button onClick={logout}>Logout</button>
        </UserInfo>
      ) : loginForm ? (
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
      )}
    </div>
  );
}
