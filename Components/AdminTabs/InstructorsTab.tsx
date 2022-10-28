import { NextPage } from "next";
import React, { useEffect } from "react";

type props = {
  instructors: [InstructorsAdmin];
};
const InstructorsTab: NextPage<props> = ({ instructors }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => {
            // const courseNames = instructor.Attends?.split(/[,:]/)
            //   .filter((_, i) => (1 + i) % 2 == 0)
            //   .join(", ");

            return (
              <tr key={instructor.UserId}>
                <td>{instructor.UserId}</td>
                <td>{instructor.FirstName}</td>
                <td>{instructor.LastName}</td>
                <td>{instructor.Email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default InstructorsTab;
