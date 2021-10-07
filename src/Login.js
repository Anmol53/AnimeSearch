import React, { useState } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: #1c0c5b;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin: 1rem auto;
  max-width: 500px;
  min-width: 50%;
  padding: 2rem;
  color: white;
  h1 {
    text-align: center;
  }
`;

const StyledForm = styled.form`
  display: grid;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 2rem;

  label {
    background-color: #c996cc;
    border: 3px solid #c996cc;
    border-radius: 10px 0 0 10px;
    font-size: 1.2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    padding: 0 10px;
  }
  input {
    background-color: rgba(0, 0, 0, 0);
    border: 3px solid #c996cc;
    color: #c996cc;
    border-radius: 0 10px 10px 0;
    font-size: 1.2rem;
    line-height: 2rem;
    height: 2rem;
    outline: none;
    padding: 0 10px;
  }

  input::placeholder {
    color: #c996cc;
    opacity: 0.5;
  }

  button {
    border: none;
    border-radius: 5px;
    background-color: #916bbf;
    color: white;
    outline: none;
    /* margin:  ; */
    padding: 0.4rem 1.2rem;
    cursor: pointer;
    place-self: center;
  }
  button.opposite {
    background-color: rgba(0, 0, 0, 0);
    padding: 0 0.5rem;
    color: #916bbf;
    text-decoration: underline;
  }
  .double-column {
    grid-column: 1/3;
    text-align: center;
  }
  .error {
    color: red;
  }
`;

export default function Login(props) {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <StyledCard>
      <h1 className="heading">Login</h1>
      <StyledForm className="form">
        <label>User Name</label>
        <input
          type="text"
          placeholder="User Name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {props.error && (
          <div className="error double-column">{props.error}</div>
        )}
        <div className="double-column">
          <button
            type="button"
            onClick={() => props.loginHandler("login", { user_name, password })}
          >
            Log In
          </button>
        </div>
        <div className="double-column">
          Not have account?
          <button
            className="opposite"
            type="button"
            onClick={() => props.formToggler(false)}
          >
            Signup here
          </button>
        </div>
      </StyledForm>
    </StyledCard>
  );
}
