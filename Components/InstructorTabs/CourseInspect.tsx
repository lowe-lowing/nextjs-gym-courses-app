import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../../lib/useContext";
import BackButton from "../BackButton";
import Student from "./Student";

type props = {
  course?: CourseObjectAdmin;
};

const CourseInspect: NextPage<props> = ({ course }) => {
  const appContext = useContext(AppCtx);
  const [gradesIsEdited, setGradesIsEdited] = useState(true);

  const router = useRouter();

  const initialGrades = course?.Students.split(",").map((student) => {
    const id = parseInt(student.split(";")[0]);
    const grade = student.split(";")[1].split("Grade: ")[1];
    return {
      UserId: id,
      Grade: grade,
    };
  }) as StudentGrade[];

  const handleSubmit = async () => {
    const result = await fetch("/api/instructor/submitGrades", {
      method: "POST",
      body: JSON.stringify({
        CourseId: course?.CourseId,
        Grades: appContext?.studentGrades?.filter((grade) => {
          const gradeCtx = initialGrades.find((x) => x.UserId == grade.UserId);
          return grade.UserId == gradeCtx?.UserId && grade.Grade != gradeCtx?.Grade;
        }),
      } as GradeBody),
    });

    if (result.status === 200) {
      router.push("/instructor?tab=courses");
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    appContext?.setStudentGrades(initialGrades);
  }, []);

  useEffect(() => {
    setGradesIsEdited(
      initialGrades.filter((grade) => {
        const gradeCtx = appContext?.studentGrades?.find((x) => x.UserId == grade.UserId);
        return grade.UserId == gradeCtx?.UserId && grade.Grade == gradeCtx.Grade;
      }).length == initialGrades.length
    );
  }, [appContext]);

  return (
    <div className="organizer">
      <BackButton />
      <div className="inspect-course-container">
        <div>
          <b>Course Title: </b>
          <span>{course?.Name}</span>
        </div>
        <div>
          <b>Description: </b>
          <span>{course?.Description}</span>
        </div>
        <div className="register-names">
          {course?.EveryWeek == 1 ? (
            <>
              <b>Start Time:</b>
              <span> Every {moment(course.StartTime).format("dddd")}</span>
            </>
          ) : (
            <>
              <b>Start Time:</b>
              <span>{moment(course?.StartTime).format("Do MMM HH:mm")}</span>
              <b>End Time:</b>
              <span>{moment(course?.EndTime).format("Do MMM HH:mm")}</span>
            </>
          )}
        </div>
        <div>
          <b>Max Attendants: </b>
          <span>{course?.MaxAttendants}</span>
        </div>
        <div>
          <b>Students:</b>
          {course?.Students?.split(",").map((student, i) => (
            <Student key={i} student={student} />
          ))}
        </div>
        <div className="edit-btns">
          <button className="submit-grades" type="button" disabled={gradesIsEdited} onClick={handleSubmit}>
            Submit Grades
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInspect;
