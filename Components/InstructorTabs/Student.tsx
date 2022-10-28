import React, { useContext, useState } from "react";
import AppCtx from "../../lib/useContext";

const Student = ({ student }: { student: string }) => {
  const appContext = useContext(AppCtx);
  const studentGrades = appContext?.studentGrades as StudentGrade[];

  const previousGrade = student.split(";")[1].split("Grade: ")[1];
  const [selectedGrade, setGrade] = useState(previousGrade);

  const id = parseInt(student.split(";")[0]);
  const name = student.split(";")[1].split("Grade")[0];

  const setNewGrade = (e: React.MouseEvent<HTMLSpanElement>) => {
    const html = e.currentTarget.innerHTML;
    const usable = selectedGrade != html ? html : previousGrade;
    setGrade(usable);
    appContext?.setStudentGrades(
      studentGrades.map((grade) => (grade.UserId == id ? { UserId: id, Grade: usable } : grade))
    );
  };
  const grades = ["F", "E", "D", "C", "B", "A"];
  return (
    <div className="attended-student flex flex-row justify-between" key={id}>
      <div>{name}</div>{" "}
      <div className="grades flex justify-items-stretch">
        {grades.map((grade, i) => (
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
};

export default Student;
