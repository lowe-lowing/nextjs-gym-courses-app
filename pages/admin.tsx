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
  departments: DepartmentFull[];
  facilities: Facility[];
  user?: UserObject;
};
const Admin: NextPage<props> = ({ user, courses, students, instructors, departments, facilities }) => {
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
        <AdminTabsController
          courses={courses}
          students={students}
          instructors={instructors}
          departments={departments}
          facilities={facilities}
        />
      ) : (
        <div>Unauthorized</div>
      )}
    </div>
  );
};

export default Admin;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const [coursesResult, studentsResult, instructorsResult, departmentsResult, facilitiesResult] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getCoursesAdmin`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getStudentsAdmin`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getInstructors`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getFullDepartment`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/getFacilities`),
  ]);

  const courses = await coursesResult.json();
  const students = await studentsResult.json();
  const instructors = await instructorsResult.json();
  const departments = await departmentsResult.json();
  const facilities = await facilitiesResult.json();

  if (user === undefined) {
    return {
      props: {
        courses,
        students,
        instructors,
        departments,
        facilities,
        user: null,
      },
    };
  }

  return {
    props: { courses, students, instructors, departments, facilities, user: user },
  };
}, sessionOptions);
