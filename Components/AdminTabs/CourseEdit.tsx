import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, MouseEvent, useState } from "react";
import BackButton from "../BackButton";

type props = {
  course?: CourseObjectAdmin;
};

const CourseEdit: NextPage<props> = ({ course }) => {
  if (typeof course === "undefined") return <div>course undefined</div>;
  const [title, setTitle] = useState(course.Name);
  const [desc, setDesc] = useState(course.Description);
  const [startDate, setStartDate] = useState<string>(course.StartTime);
  const [endDate, setEndDate] = useState<string>(course.EndTime);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [maxAttendants, setMaxAttendants] = useState<number | string>(course.MaxAttendants);
  const [removedStudents, setRemovedStudents] = useState<Array<number>>([]);
  const [checked, setChecked] = useState<boolean>(course.EveryWeek == 1 ? true : false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    const result = await fetch("/api/admin/editCourse", {
      method: "POST",
      body: JSON.stringify({
        CourseId: course.CourseId,
        Name: target.courseName.value,
        Description: target.desc.value,
        MaxAttendants: target.maxAttends.value,
        StartTime: target.starttime.value,
        Endtime: target.endtime.value,
        EveryWeek: checked ? 1 : 0,
        removedStudents,
      }),
    });

    if (result.status === 200) {
      router.push("/admin?tab=courses");
    } else {
      alert("Something went wrong!");
    }
  };

  const deleteCourse = async () => {
    const result = await fetch("/api/admin/deleteCourse", {
      method: "POST",
      body: JSON.stringify({
        CourseId: course.CourseId,
      }),
    });

    if (result.status === 200) {
      router.push("/admin?tab=courses");
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

  const removeStudent = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    const button = e.currentTarget;
    const siblingDiv = e.currentTarget.previousElementSibling;
    const className = siblingDiv?.className;

    if (className != "removed") {
      siblingDiv?.classList.add("removed");
      button.innerHTML = "Add";
      setRemovedStudents((rem) => [...rem, id]);
    } else {
      siblingDiv?.classList.remove("removed");
      button.innerHTML = "Remove";
      setRemovedStudents((rem) => rem.filter((removedUser) => removedUser != id));
    }
  };

  return (
    <div className="organizer">
      <BackButton />
      <div className="add-coure-container">
        <form onSubmit={handleSubmit}>
          <div className="login-column">
            <span>Course Title:</span>
            <input
              required
              type="text"
              placeholder="Course Title..."
              name="courseName"
              value={title}
              onChange={(text) => setTitle(text.currentTarget.value)}
            />
          </div>
          <div className="login-column">
            <span>Description:</span>
            <input
              required
              type="text"
              placeholder="Description..."
              name="desc"
              value={desc}
              onChange={(text) => setDesc(text.currentTarget.value)}
            />
          </div>
          <div className="register-names">
            <div>
              <span>Start Time:</span>
              <input
                required
                type="datetime-local"
                placeholder="Start Time..."
                name="starttime"
                value={startDate}
                onChange={validateStartDate}
              />
            </div>
            <div>
              <span>End Time:</span>
              <input
                required
                type="datetime-local"
                placeholder="End Time..."
                name="endtime"
                value={endDate}
                onChange={validateEndDate}
              />
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
          <div className="login-column">
            <span>Max Attendants:</span>
            <input
              required
              type="number"
              min="0"
              max="20"
              placeholder="Max Attendants..."
              name="maxAttends"
              value={maxAttendants}
              onChange={(text) => setMaxAttendants(parseInt(text.currentTarget.value) || "")}
            />
          </div>
          <div>
            <b>Students:</b>
            {course.Students?.split(",").map((student) => {
              const id = parseInt(student.split(":")[0]);
              const name = student.split(":")[1];
              return (
                <div className="attended-student" key={id}>
                  <div>{name}</div>
                  <button type="button" onClick={(e) => removeStudent(e, id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="edit-btns">
            <button type="submit">Submit</button>
            <button type="button" onClick={deleteCourse}>
              Delete Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEdit;
