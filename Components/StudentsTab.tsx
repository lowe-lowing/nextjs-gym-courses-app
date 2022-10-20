import { NextPage } from "next";
import React from "react";

type props = {
  students: [StudentsAdmin];
};

const StudentsTab: NextPage<props> = ({ students }) => {
  return (
    <table>
      <tr>
        <th>User ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Registered Coursess</th>
        <th>Is Admin</th>
      </tr>
      {students.map((student) => {
        const courseNames = student.Attends?.split(/[,:]/)
          .filter((_, i) => (1 + i) % 2 == 0)
          .join(", ");

        return (
          <tr>
            <td>{student.UserId}</td>
            <td>{student.FirstName}</td>
            <td>{student.LastName}</td>
            <td>{student.Email}</td>
            <td>{courseNames}</td>
            <td>{student.Admin == 1 ? "true" : "false"}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default StudentsTab;
