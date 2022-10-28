import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

type body = {
  Email: string;
  Password: string;
  LastName: string;
  FirstName: string;
};

const Register: NextPage = () => {
  const [emailValidMessage, setEmailValidMessage] = useState<string>("");
  // const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValidMessage, setPasswordValidMessage] = useState<string>("At least 3 characters");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (validateEmail(target.email.value)) {
      setEmailValidMessage("");
      if (passwordValid) {
        // kanske kryptera lösenordet
        const result = await fetch("/api/registerUser", {
          method: "POST",
          body: JSON.stringify({
            Email: target.email.value,
            Password: target.password.value,
            LastName: target.lastname.value,
            FirstName: target.firstname.value,
          } as body),
        });
        if (result.status === 200) {
          router.push("/login");
        } else {
          setEmailValidMessage("Email already exists, try another email address");
        }
      }
    } else {
      setEmailValidMessage("Please enter a valid email");
    }
  };

  const validateEmail = (email: string) => {
    const filter =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = filter.test(email);
    // setEmailValid(emailIsValid);
    return emailIsValid;
  };

  const validatePassword = (e: FormEvent<HTMLInputElement>) => {
    setPasswordValidMessage(e.currentTarget.value.length >= 3 ? "" : "At least 3 characters");
    setPasswordValid(e.currentTarget.value.length >= 3 ? true : false);
  };
  return (
    <div className="main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-column">
            <span>Email:</span>
            <input required type="email" placeholder="Email..." name="email" />
            <span className="errorMessage">{emailValidMessage}</span>
          </div>
          <div className="login-column">
            <span>
              Password: <span className="errorMessage">{passwordValidMessage}</span>
            </span>
            <input required type="password" placeholder="Password..." name="password" onChange={validatePassword} />
          </div>
          <div className="register-names">
            <div>
              <span>First Name:</span>
              <input required type="text" placeholder="First name..." name="firstname" />
            </div>
            <div>
              <span>Last Name:</span>
              <input required type="text" placeholder="Last name..." name="lastname" />
            </div>
          </div>
          <div className="register-submit">
            <button type="submit">Register</button>
            <span className="login-register">
              <div>Already have an account?</div>
              <Link href="/login" className="link">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
