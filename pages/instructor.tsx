import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import AppCtx from "../lib/useContext";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { NextPage } from "next";
import InstructorTabsController from "../Components/TabControllers/InstructorTabsController";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  user?: UserObject;
};
const instructor: NextPage<props> = ({ user, courses, students }) => {
  const appContext = useContext(AppCtx);
  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);
  return (
    <div className="h-full">
      {user?.IsInstructor == 1 ? (
        <InstructorTabsController courses={courses} students={students} />
      ) : (
        <div>Unauthorized</div>
      )}
    </div>
  );
};

export default instructor;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const userBody = JSON.stringify({
    InstructorId: user?.UserId,
  });
  const getCoursesResult = await fetch("http://localhost:3000/api/instructor/getCoursesInstructor", {
    method: "POST",
    body: userBody,
  });
  const courses = await getCoursesResult.json();

  const getStudentsResult = await fetch("http://localhost:3000/api/instructor/getStudentsInstructor", {
    method: "POST",
    body: userBody,
  });
  const students = await getStudentsResult.json();

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
