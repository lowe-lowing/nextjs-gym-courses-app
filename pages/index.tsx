import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import AppCtx from "../lib/useContext";
import Course from "../Components/Course";

type initialProps = {
  courses: [CourseObject];
  user?: UserObject;
};

const Home: NextPage<initialProps> = ({ courses, user }) => {
  const appContext = useContext(AppCtx);
  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);

  return (
    <div className="main-container">
      {courses.map((course) => (
        <Course course={course} user={user} key={course.CourseId} />
      ))}
    </div>
  );
};

export default Home;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const result = await fetch("http://localhost:3000/api/getCourses");
  const courses = await result.json();

  if (user === undefined) {
    return {
      props: {
        courses,
        user: null,
      },
    };
  }
  return {
    props: { courses, user: user },
  };
}, sessionOptions);
