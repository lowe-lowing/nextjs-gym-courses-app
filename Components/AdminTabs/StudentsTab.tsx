import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

type props = {
  students: StudentsAdmin[];
};

const StudentsTab: NextPage<props> = ({ students }) => {
  const [studentsState, setStudentsState] = useState<StudentsAdmin[]>(students);

  const filterUsers = (e: string) => {
    if (e == "") {
      setStudentsState(students);
    } else {
      setStudentsState((state) => state.filter((user) => user.FirstName.toLowerCase().includes(e.toLowerCase())));
    }
  };
  return (
    <>
      <input type="text" onChange={(e) => filterUsers(e.currentTarget.value)} placeholder="Filter by firstname..." />
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {studentsState.map((student) => {
            return (
              <Link key={student.UserId} href={`admin?tab=students&id=${student.UserId.toString()}`} shallow={true}>
                <tr className="hover:bg-secondary hover:cursor-pointer">
                  <td>{student.UserId}</td>
                  <td>{student.FirstName}</td>
                  <td>{student.LastName}</td>
                  <td>{student.Email}</td>
                  <td>{student.IsAdmin == 1 ? "Admin" : student.IsInstructor == 1 ? "Instructor" : "Student"}</td>
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default StudentsTab;
