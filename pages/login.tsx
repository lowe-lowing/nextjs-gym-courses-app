import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const form: LoginForm = {
      Email: target.email.value,
      Password: target.password.value,
    };
    const login = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const loginJson = await login.json();
    if (loginJson.length == 1) {
      router.push("/");
    } else {
      setErrorMsg("Wrong username or password.");
      const newspaperSpinning = [{ transform: "scale(1)" }, { transform: "scale(1.025)" }, { transform: "scale(1)" }];

      const newspaperTiming = {
        duration: 300,
        iterations: 1,
      };
      document.querySelector(".errorMessage")?.animate(newspaperSpinning, newspaperTiming);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-column">
            <span>Email:</span>
            <input required type="text" placeholder="Email..." name="email" />
          </div>
          <div className="login-column">
            <span>Password:</span>
            <input required type="password" placeholder="Password..." name="password" />
          </div>
          <div className="errorMessage">{errorMsg}</div>
          <div className="register-submit">
            <button type="submit">Log In</button>
            <span className="login-register">
              <div>{`Don't have an account?`}</div>
              <Link href="/register" className="link">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
