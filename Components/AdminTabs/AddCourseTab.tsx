import { Minus } from "iconsax-react";
import { NextPage } from "next";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

type props = {
  instructors: InstructorsAdmin[];
  facilities: Facility[];
};

const AddCourseTab: NextPage<props> = ({ instructors, facilities }) => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>();
  const [checked, setChecked] = useState<boolean>(false);
  const [instructorsIdArr, setInstructorsIdArr] = useState<Array<string>>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const department = target.department.options[target.department.selectedIndex].value;

    const result = await fetch("/api/admin/addCourse", {
      method: "POST",
      body: JSON.stringify({
        Name: target.courseName.value,
        Description: target.desc.value,
        MaxAttendants: target.maxAttends.value,
        StartTime: target.starttime.value,
        Endtime: target.endtime.value,
        EveryWeek: checked ? 1 : 0,
        DepartmentId: department,
        InstructorsIds: instructorsIdArr,
        FacilityId: parseInt(target.facility.value),
      }),
    });
    if (result.status === 200) {
      target.reset();
      setSuccessMsg("Successfully added course");
    } else {
      alert("Something went wrong!");
    }
  };
  const validateStartDate = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setStartDate(value);
    if (endDate) {
      if (value > endDate) {
        setErrorMsg("Start time must be before end time");
      } else {
        setErrorMsg("");
      }
    }
  };
  const validateEndDate = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEndDate(value);
    if (startDate) {
      if (value < startDate) {
        setErrorMsg("End time must be after start time");
      } else {
        setErrorMsg("");
      }
    }
  };

  const removeInstructor = (id: string) => {
    setInstructorsIdArr((state) => state.filter((x) => x !== id));
  };
  const addInstructor = (id: string) => {
    setInstructorsIdArr((state) => [...state, id]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/admin/getDepartments");
      const parsed = await result.json();
      setDepartments(parsed);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div className="add-coure-container">
      <form onSubmit={handleSubmit}>
        <div className="login-column">
          <span>Course Title:</span>
          <input required type="text" placeholder="Course Title..." name="courseName" />
        </div>
        <div className="login-column">
          <span>Description:</span>
          <input required type="text" placeholder="Description..." name="desc" />
        </div>
        <div className="register-names">
          <div>
            <span>Start Time:</span>
            <input
              required
              type="datetime-local"
              placeholder="Start Time..."
              name="starttime"
              onChange={validateStartDate}
            />
          </div>
          <div>
            <span>End Time:</span>
            <input required type="datetime-local" placeholder="End Time..." name="endtime" onChange={validateEndDate} />
          </div>
        </div>
        {errorMsg != "" && <span className="errorMessage">{errorMsg}</span>}
        <label className="checkbox-container">
          <div>Every Week</div>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <span className="checkmark"></span>
        </label>
        {/* fix more than one instructor!!! */}
        <div className="flex gap-1 mb-[-10px]">
          <label htmlFor="instructor">Instructors:</label>
          <select
            required
            name="instructor"
            className="hover:cursor-pointer"
            value={"default"}
            onChange={(e) => addInstructor(e.currentTarget.value.toString())}
          >
            <option hidden value="default">
              Add Instructor...
            </option>
            {instructors?.map((instructor, i) => {
              const inIdArray = instructorsIdArr.indexOf(instructor.UserId.toString()) == -1;
              if (inIdArray) {
                return (
                  <option key={i} value={instructor.UserId}>
                    {instructor.FirstName} {instructor.LastName}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="flex flex-row">
          {instructorsIdArr.map((id) => {
            const instructor = instructors.find((x) => x.UserId === parseInt(id));

            return (
              <div
                className="flex items-center bg-primary m-1 p-1 rounded-full text-white hover:cursor-pointer"
                onClick={() => removeInstructor(id)}
              >
                <span>
                  {instructor?.FirstName} {instructor?.LastName}
                </span>
                <span>
                  <Minus size="20" color="black" />
                </span>
              </div>
            );
          })}
        </div>
        <div className="register-names">
          <label htmlFor="department">Department:</label>
          <select required defaultValue="default" name="department">
            <option disabled value="default">
              -- select an option --
            </option>
            {departments?.map((department, i) => {
              return (
                <option key={i} value={department.DepartmentId}>
                  {department.DepartmentId}: {department.BodyPart}
                </option>
              );
            })}
          </select>
        </div>
        <div className="register-names">
          <label htmlFor="instructor">Facility:</label>
          <select required defaultValue="default" name="facility">
            <option disabled value="default">
              -- select facility --
            </option>
            {facilities?.map((facility, i) => {
              return (
                <option key={i} value={facility.FacilityId}>
                  {facility.Name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="login-column">
          <span>Max Attendants:</span>
          <input required type="number" min="1" max="20" placeholder="Max Attendants..." name="maxAttends" />
        </div>
        {successMsg != "" && (
          <div className="register-submit">
            <span className="successMessage">{successMsg}</span>
            <Link href="/admin?tab=courses" shallow={false}>
              Go to courses
            </Link>
          </div>
        )}
        <div>
          <button type="submit">Add Course</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseTab;
