import { NextPage } from "next";
import Link from "next/link";
import React from "react";

type props = {
  students: [StudentsAdmin];
};

const StudentsTab: NextPage<props> = ({ students }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => {
            return (
              <Link key={i} href={`instructor?tab=students&id=${student.UserId}`} shallow={true}>
                <tr className="hover:bg-secondary hover:cursor-pointer">
                  <td>{student.FirstName}</td>
                  <td>{student.LastName}</td>
                  <td>{student.Email}</td>
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
