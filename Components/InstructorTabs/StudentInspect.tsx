import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../../lib/useContext";
import BackButton from "../BackButton";
import CourseGrade from "./CourseGrade";

type props = {
  student?: StudentsAdmin;
  courses: CourseObjectAdmin[];
};

const StudentInspect = ({ student, courses }: props) => {
  const InstructorStudentCourses = courses.filter(
    (course) => course.Attends.split(",").indexOf(student?.UserId.toString() || "") > -1
  );
  const appContext = useContext(AppCtx);
  const [gradesIsEdited, setGradesIsEdited] = useState(false);

  const [initialGrades, setInitialGrades] = useState<Array<CourseGrade>>([]);

  const router = useRouter();

  useEffect(() => {
    let init: Array<CourseGrade> = [];
    InstructorStudentCourses.forEach((course) => {
      const id = course.CourseId;
      course.Students.split(",").forEach((courseStudent) => {
        const studentId = parseInt(courseStudent.split(";")[0]);
        const grade = courseStudent.split(";")[1].split("Grade: ")[1];
        if (studentId == student?.UserId) {
          init.push({
            CourseId: id,
            Grade: grade,
          });
        }
      });
    });

    appContext?.setCourseGrades(init);
    setInitialGrades(init);
  }, []);

  useEffect(() => {
    setGradesIsEdited(JSON.stringify(initialGrades) != JSON.stringify(appContext?.courseGrades));
  }, [appContext]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(appContext?.courseGrades);

    const result = await fetch("/api/instructor/submitCourseGrades", {
      method: "POST",
      body: JSON.stringify({
        UserId: student?.UserId,
        Grades: appContext?.courseGrades?.filter((grade) => {
          const gradeCtx = initialGrades.find((x) => x.CourseId == grade.CourseId);
          return grade.CourseId == gradeCtx?.CourseId && grade.Grade != gradeCtx?.Grade;
        }),
      } as CourseGradeBody),
    });

    if (result.status === 200) {
      router.reload();
    } else {
      alert("Error");
    }
  };

  return (
    <div className="organizer">
      <BackButton href={"instructor?tab=students"} loadShallow={true} />
      <div className="add-coure-container">
        {student ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="font-bold text-xs">Email: </div>
              <div>{student.Email}</div>
            </div>
            <div className="flex gap-10">
              <div>
                <div className="font-bold text-xs">First name: </div>
                <div>{student.FirstName}</div>
              </div>
              <div>
                <div className="font-bold text-xs">Last name: </div>
                <div>{student.LastName}</div>
              </div>
            </div>
            <div className="font-bold">Courses joined instructed by you:</div>
            <div className="flex flex-col">
              {InstructorStudentCourses.map((course, i) => {
                return <CourseGrade key={i} course={course} student={student} />;
              })}
            </div>
            <div className="edit-btns">
              <button className="submit-grades" type="submit" disabled={!gradesIsEdited}>
                Submit Grades
              </button>
            </div>
          </form>
        ) : (
          <div>no user found</div>
        )}
      </div>
    </div>
  );
};

export default StudentInspect;
