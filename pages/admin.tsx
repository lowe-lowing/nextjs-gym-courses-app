import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import AppCtx from "../lib/useContext";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { NextPage } from "next";
import Tabs from "../Components/Tabs.js";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  user?: UserObject;
};
const admin: NextPage<props> = ({ user, courses, students }) => {
  const appContext = useContext(AppCtx);
  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);
  return (
    <div>
      <h2>Administration Page</h2>
      {user?.Admin == 1 ? <Tabs courses={courses} students={students} /> : <div>Unauthorized</div>}
    </div>
  );
};

export default admin;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const getCoursesResult = await fetch("http://localhost:3000/api/getCoursesAdmin");
  const courses = await getCoursesResult.json();

  const getStudentsResult = await fetch("http://localhost:3000/api/getStudentsAdmin");
  const students = await getStudentsResult.json();

  // console.log(courses);
  // console.log(students);

  if (user === undefined) {
    return {
      props: {
        courses,
        students,
        user: null,
      },
    };
  }
  return {
    props: { courses, students, user: user },
  };
}, sessionOptions);
