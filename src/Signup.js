import React, { useState } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: #1c0c5b;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin: 1rem auto;
  min-width: 300px;
  max-width: 690px;
  width: 50%;
  padding: 1rem;
  color: white;
  .heading {
    text-align: center;
    background-color: #c996cc;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 -1rem;
    padding: 0.7rem 0;
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
    padding: 0.4rem 1.2rem;
    cursor: pointer;
    place-self: center;
  }

  .action {
    display: grid;
    grid-column: 1fr;
    justify-content: center;
    row-gap: 0.5rem;
  }

  .error {
    text-align: center;
    color: red;
  }

  .switch-form span {
    padding: 0 0.5rem;
    color: #916bbf;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function Signup(props) {
  const [user_name, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <StyledCard>
      <h1 className="heading">Sign up</h1>
      <StyledForm className="form">
        <label>User Name</label>
        <input
          type="text"
          placeholder="User Name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <label>Email ID</label>
        <input
          type="email"
          placeholder="Mail ID"
          value={user_mail}
          onChange={(e) => setMail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="error double-column">{props.error}</div>
        <div className="action">
          <button
            type="button"
            onClick={() =>
              props.signupHandler("signup", {
                user_name,
                first_name,
                last_name,
                user_mail,
                password
              })
            }
          >
            Sign Up
          </button>
          <p className="switch-form">
            Already User?
            <span onClick={() => props.formToggler(true)}>Login here</span>
          </p>
        </div>
      </StyledForm>
    </StyledCard>
  );
}
