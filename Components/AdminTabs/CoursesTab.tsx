import { NextPage } from "next";
import React from "react";
import CourseAdmin from "../CourseAdmin";

type Props = {
  courses: CourseObjectAdmin[];
  instructors: InstructorsAdmin[];
};

const CoursesTab: NextPage<Props> = ({ courses, instructors }) => (
  <div>
    {courses.length > 0 &&
      courses.map((course, i) => <CourseAdmin key={i} course={course} instructors={instructors} />)}
  </div>
);

export default CoursesTab;
