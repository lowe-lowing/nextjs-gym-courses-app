import { NextPage } from "next";
import React from "react";
import CourseInstructor from "../CourseInstructor";

type Props = {
  courses: [CourseObjectAdmin];
  instructors: InstructorsAdmin[];
};

const CoursesTab: NextPage<Props> = ({ courses, instructors }) => (
  <div>
    {courses?.map((course, i) => (
      <CourseInstructor key={i} course={course} instructors={instructors} />
    ))}
  </div>
);

export default CoursesTab;
