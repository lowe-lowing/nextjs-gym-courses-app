import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import AppCtx from "../lib/useContext";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { NextPage } from "next";
import AdminTabsController from "../Components/TabControllers/AdminTabsController";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  instructors: [InstructorsAdmin];
  user?: UserObject;
};
const admin: NextPage<props> = ({ user, courses, students, instructors }) => {
  const appContext = useContext(AppCtx);
  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);
  return (
    <div className="h-full">
      {/* <h2>Administration Page</h2> */}
      {user?.IsAdmin == 1 ? (
        <AdminTabsController courses={courses} students={students} instructors={instructors} />
      ) : (
        <div>Unauthorized</div>
      )}
    </div>
  );
};

export default admin;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const getCoursesResult = await fetch("http://localhost:3000/api/admin/getCoursesAdmin");
  const courses = await getCoursesResult.json();

  const getStudentsResult = await fetch("http://localhost:3000/api/admin/getStudentsAdmin");
  const students = await getStudentsResult.json();

  const getInstructorsResult = await fetch("http://localhost:3000/api/admin/getInstructors");
  const instructors = await getInstructorsResult.json();

  if (user === undefined) {
    return {
      props: {
        courses,
        students,
        instructors,
        user: null,
      },
    };
  }
  return {
    props: { courses, students, instructors, user: user },
  };
}, sessionOptions);
