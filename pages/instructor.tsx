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
  instructors: InstructorsAdmin[];
  user?: UserObject;
};
const Instructor: NextPage<props> = ({ user, courses, students, instructors }) => {
  const appContext = useContext(AppCtx);

  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, [user, appContext]);

  return (
    <div className="h-full">
      {user?.IsInstructor == 1 ? (
        <InstructorTabsController courses={courses} students={students} instructors={instructors} />
      ) : (
        <div>Unauthorized</div>
      )}
    </div>
  );
};

export default Instructor;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const userBody = JSON.stringify({
    InstructorId: user?.UserId,
  });
  const getCoursesResult = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/instructor/getCoursesInstructor`, {
    method: "POST",
    body: userBody,
  });
  const courses = await getCoursesResult.json();

  const getStudentsResult = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/instructor/getStudentsInstructor`, {
    method: "POST",
    body: userBody,
  });
  const students = await getStudentsResult.json();

  const getInstructorsResult = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getInstructors`);
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
