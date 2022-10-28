import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import type { NextPage } from "next";
import AppCtx from "../lib/useContext";

const Header: NextPage = () => {
  const router = useRouter();
  const appContext = useContext(AppCtx);
  const currentUser = appContext?.currentUser;

  const handleLogout = async () => {
    const destroySession = await fetch("api/logout");
    if (destroySession.status == 200) {
      appContext?.setCurrentUser(null);
      router.push("/");
    } else {
      alert("something went wrong");
    }
  };

  const buttonsVisible = ["/login", "/register"];
  return (
    <div className="header">
      <div onClick={() => router.push("/")} className="header-title">
        Lowes Workouts
      </div>
      <div>
        {buttonsVisible.indexOf(router.pathname) == -1 &&
          (currentUser != undefined ? (
            <>
              <span className="user-names">
                {currentUser.FirstName} {currentUser.LastName}
              </span>
              {currentUser?.IsAdmin == 1 && <button onClick={() => router.push("/admin")}>Admin</button>}
              {currentUser?.IsInstructor == 1 && <button onClick={() => router.push("/instructor")}>Instructor</button>}
              <button onClick={() => router.push("/profile")}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push("/login")}>Login</button>
              <button onClick={() => router.push("/register")}>Register</button>
            </>
          ))}
      </div>
    </div>
  );
};

export default Header;
