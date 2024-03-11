import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import BackButton from "../BackButton";

type props = {
  student?: StudentsAdmin;
};

const StudentTab: NextPage<props> = ({ student }) => {
  if (typeof student === "undefined") return <div>student undefined</div>;
  const [email, setEmail] = useState<string>(student.Email);
  const [firstName, setFirstName] = useState<string>(student.FirstName);
  const [lastName, setLastName] = useState<string>(student.LastName);
  const [selected, setSelected] = useState<number>(
    student.IsAdmin ? 1 : student.IsInstructor ? 2 : 3
  );
  const [emailValidMessage, setEmailValidMessage] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const router = useRouter();

  const initialValues = {
    email: student.Email,
    firstName: student.FirstName,
    lastName: student.LastName,
    selected: student.IsAdmin ? 1 : student.IsInstructor ? 2 : 3,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (validateEmail(target.email.value)) {
      setEmailValidMessage("");
      const levelChanged = initialValues.selected != selected;
      const result = await fetch("/api/admin/editUser", {
        method: "POST",
        body: JSON.stringify({
          UserId: student.UserId,
          Email: target.email.value,
          FirstName: target.firstname.value,
          LastName: target.lastname.value,
          LevelChanged: levelChanged,
          InitLevel: initialValues.selected,
          Level: target.level.value,
        } as EditUserBody),
      });

      if (result.status === 200) {
        router.push("/admin?tab=students");
      } else {
        alert("Something went wrong!");
      }
    } else {
      setEmailValidMessage("Please enter a valid email");
    }
  };

  const validateEmail = (email: string) => {
    const filter =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = filter.test(email);
    // setEmailValid(emailIsValid);
    return emailIsValid;
  };

  useEffect(() => {
    setIsEdited(
      JSON.stringify(initialValues) == JSON.stringify({ email, firstName, lastName, selected })
    );
  }, [email, firstName, lastName, selected]);

  return (
    <div className="organizer">
      <BackButton href="/admin?tab=students" loadShallow={true} />
      <div className="add-coure-container">
        <form onSubmit={handleSubmit}>
          <div className="login-column">
            <span>Email:</span>
            <input
              required
              type="email"
              placeholder="Email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <span className="errorMessage">{emailValidMessage}</span>
          </div>
          <div className="register-names">
            <div>
              <span>First Name:</span>
              <input
                required
                type="text"
                placeholder="First name..."
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div>
              <span>Last Name:</span>
              <input
                required
                type="text"
                placeholder="Last name..."
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label htmlFor="level">Level:</label>
            <select
              required
              value={selected}
              name="level"
              onChange={(e) => setSelected(parseInt(e.currentTarget.value))}
            >
              <option value={1}>Admin</option>
              <option value={2}>Instructor</option>
              <option value={3}>Student</option>
            </select>
          </div>
          <div className="flex">
            <button className="submit-grades" disabled={isEdited} type="submit">
              Change
            </button>
          </div>
          <div className="text-2xl font-bold">Courses:</div>
          {student.Attends ? (
            <div>
              {student.Attends.split(",").map((Attend, i) => {
                const grades = ["F", "E", "D", "C", "B", "A"];
                const courseName = Attend.split(":")[1].split("grade")[0];
                const courseGrade = Attend.split("grade")[1];

                return (
                  <div key={i} className="flex flex-row justify-between attended-student">
                    <div>{courseName}</div>
                    <div className="flex user-grades justify-items-stretch">
                      {grades.reverse().map((grade, i) => (
                        <span key={i} className={grade == courseGrade ? "selected-grade" : ""}>
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No Courses...</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentTab;
