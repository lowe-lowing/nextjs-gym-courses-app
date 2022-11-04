import React, { useContext, useState } from "react";
import AppCtx from "../../lib/useContext";

type props = {
  course: CourseObjectAdmin;
  student: StudentsAdmin;
};

const CourseGrade = ({ course, student }: props) => {
  const studentInCourse = course.Students.split(",").filter((x) => parseInt(x.split(";")[0]) === student.UserId)[0];
  const previousGrade = studentInCourse.split("Grade: ")[1];
  const courseName = course.Name;

  const [selectedGrade, setGrade] = useState(previousGrade);

  const appContext = useContext(AppCtx);
  const courseGrades = appContext?.courseGrades as CourseGrade[];

  const CourseId = course.CourseId;

  const setNewGrade = (e: React.MouseEvent<HTMLSpanElement>) => {
    const html = e.currentTarget.innerHTML;
    const usable = selectedGrade != html ? html : previousGrade;
    setGrade(usable);
    appContext?.setCourseGrades(
      courseGrades.map((grade) => (grade.CourseId == CourseId ? { CourseId: CourseId, Grade: usable } : grade))
    );
  };

  const grades = ["F", "E", "D", "C", "B", "A"];
  return (
    <div className="attended-student flex flex-row justify-between">
      <div>{courseName}</div>
      <div className="grades flex justify-items-stretch">
        {grades.reverse().map((grade, i) => (
          <span
            key={i}
            className={
              selectedGrade == grade && previousGrade == grade
                ? "previus-grade"
                : selectedGrade == grade
                ? "selected-grade"
                : ""
            }
            onClick={(e) => setNewGrade(e)}
          >
            {grade}
          </span>
        ))}
      </div>
    </div>
  );
  //   return (
  //     <div>
  //       <div>{courseName}</div>
  //       <div>{grade}</div>
  //     </div>
  //   );

  // const appContext = useContext(AppCtx);
  // const studentGrades = appContext?.studentGrades as StudentGrade[];

  // const previousGrade = student.split(";")[1].split("Grade: ")[1];
  // const [selectedGrade, setGrade] = useState(previousGrade);

  // const id = parseInt(student.split(";")[0]);
  //   const name = student.split(";")[1].split("Grade")[0];

  // const setNewGrade = (e: React.MouseEvent<HTMLSpanElement>) => {
  //   const html = e.currentTarget.innerHTML;
  //   const usable = selectedGrade != html ? html : previousGrade;
  //   setGrade(usable);
  //   appContext?.setStudentGrades(
  //     studentGrades.map((grade) => (grade.UserId == id ? { UserId: id, Grade: usable } : grade))
  //   );
  // };
  // const grades = ["F", "E", "D", "C", "B", "A"];
  // return (
  //   <div className="attended-student flex flex-row justify-between" key={id}>
  //     <div>{name}</div>
  //     <div className="grades flex justify-items-stretch">
  //       {grades.reverse().map((grade, i) => (
  //         <span
  //           key={i}
  //           className={
  //             selectedGrade == grade && previousGrade == grade
  //               ? "previus-grade"
  //               : selectedGrade == grade
  //               ? "selected-grade"
  //               : ""
  //           }
  //           onClick={(e) => setNewGrade(e)}
  //         >
  //           {grade}
  //         </span>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default CourseGrade;
