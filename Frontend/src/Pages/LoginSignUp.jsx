import React, { useState } from "react";
import "./CSS/LoginSignUp.css";
const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({});
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.placeholder]: e.target.value });
  };
  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    console.log("Signup", formData);
    let responseData;
    await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={() => {
            state === "Sign Up" ? signup() : login();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign Up
            </span>
          </p>
        )}
        {state === "Sign Up" ? (
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>
              I agree to the <span>Terms</span> and <span>Privacy Policy</span>
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
