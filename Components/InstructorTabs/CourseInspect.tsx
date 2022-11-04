import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../../lib/useContext";
import BackButton from "../BackButton";
import Student from "./Student";

type props = {
  course?: CourseObjectAdmin;
  instructors: InstructorsAdmin[];
};

const CourseInspect: NextPage<props> = ({ course, instructors }) => {
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
      initialGrades?.filter((grade) => {
        const gradeCtx = appContext?.studentGrades?.find((x) => x.UserId == grade.UserId);
        return grade.UserId == gradeCtx?.UserId && grade.Grade == gradeCtx.Grade;
      }).length == initialGrades.length
    );
  }, [appContext]);

  const instructorIdArr = course?.Instructors?.split(",");
  const courseInstructors = instructorIdArr?.map((id) => instructors.find((x) => x.UserId == parseInt(id)));
  return (
    <div className="organizer">
      <BackButton href="/instructor?tab=courses" loadShallow={true} />
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
        <div className="flex flex-row gap-5">
          <div>
            <div className="font-bold text-xs">Bodypart:</div>
            <div>{course?.BodyPart}</div>
          </div>
          <div>
            <div className="font-bold text-xs">Code:</div>
            <div>{course?.DepartmentId}</div>
          </div>
        </div>
        <div>
          <span className="font-bold">Location: </span>
          <span>{course?.FacilityName}</span>
        </div>
        <div className="mb-1">
          <span className="font-bold">Instructors: </span>
          <span>
            {courseInstructors != null
              ? courseInstructors.map((courseInstructor, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    {courseInstructor?.FirstName} {courseInstructor?.LastName}
                  </span>
                ))
              : "Unknown"}
          </span>
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
