import { Trash } from "iconsax-react";
import { NextPage } from "next";
import React, { useState } from "react";

type props = {
  departments: DepartmentFull[];
};

const DepartmentsTab: NextPage<props> = ({ departments }) => {
  const [departmentsState, setDepartmentsState] = useState<DepartmentFull[]>(departments);

  const handleAddDepartment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    const result = await fetch("/api/admin/addDepartment", {
      method: "POST",
      body: JSON.stringify({
        code: target.code.value,
        bodypart: target.bodypart.value,
      }),
    });
    if (result.status == 200) {
      setDepartmentsState((state) => [
        ...state,
        {
          DepartmentId: target.code.value,
          BodyPart: target.bodypart.value,
          AdminId: 0,
        } as DepartmentFull,
      ]);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };
  const handleRemove = async (i: number) => {
    const result = await fetch("/api/admin/removeDepartment", {
      method: "POST",
      body: JSON.stringify({
        id: i,
      }),
    });
    if (result.status == 200) {
      setDepartmentsState((state) => state.filter((dep) => dep.DepartmentId != i));
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleAddDepartment(e)} className="mb-2">
        <div>Add Department:</div>
        <input required type="text" placeholder="Department Code..." name="code" className="bg-secondary p-1 mr-1" />
        <input required type="text" placeholder="Bodypart..." name="bodypart" className="bg-secondary p-1 mr-1" />
        <button type="submit">Add</button>
      </form>
      <div className="collapse-table w-96 p-4">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th>Code</th>
              <th>BodyPart</th>
              {/* <th>Admin Id</th> */}
            </tr>
          </thead>
          <tbody>
            {departmentsState.map((department, i) => (
              <tr key={i} className="border-b-2 border-bColor">
                <td>{department.DepartmentId}</td>
                <td>{department.BodyPart}</td>
                {/* <td>{department.AdminId}</td> */}
                <td className="flex flex-row justify-end">
                  <Trash
                    size="17"
                    color="#FF5C5C"
                    className="hover:cursor-pointer mt-1"
                    onClick={() => handleRemove(department.DepartmentId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DepartmentsTab;

// TODO:fix department add
// TODO:fix user filter
// TODO:fix more than one instructor?
