import { NextPage } from "next";
import React, { MouseEvent, useContext, useState } from "react";
import { Calendar, Clock, People } from "iconsax-react";
import AppCtx from "../lib/useContext";
import moment from "moment";

type initialProps = {
  course: CourseObject;
  user?: UserObject;
};

const Course: NextPage<initialProps> = ({ course, user }) => {
  const userIdString = user?.UserId.toString() || "";
  const [userIsAttended, setUserIsAttended] = useState<boolean | undefined>(
    course.Attends?.split(",").indexOf(userIdString) > -1 || false
  );
  const [numberOfAttended, setNumberOfAttended] = useState<number>(course.Attends?.split(",").length || 0);

  const attendCourse = async (CourseId: number, operation: string) => {
    const result = await fetch(`/api/${operation}`, {
      method: "POST",
      body: JSON.stringify({
        UserId: user?.UserId,
        CourseId,
      }),
    });

    if (result.status === 200) {
      setUserIsAttended(operation == "attendCourse");
      setNumberOfAttended((text) => (operation == "attendCourse" ? text + 1 : text - 1));
    } else {
      const parsed = await result.json();
      alert(parsed);
    }
  };

  return (
    <div className="workout-container">
      <div className="workout-container-div">
        <div className="workout-name">{course.Name}</div>
        <div className="workout-desc">{course.Description}</div>
        <div>Instructors: {course.Instructors != null ? course.Instructors : "Unknown"}</div>
        <div className="to-replace">
          {user ? (
            userIsAttended ? (
              <div className="unattend">
                <div className="workout-attended">You are signed up</div>
                <button onClick={() => attendCourse(course.CourseId, "unattendCourse")}>Unattend</button>
              </div>
            ) : numberOfAttended == course.MaxAttendants ? (
              <div>Max Capacity</div>
            ) : (
              <button className="btn-attend" onClick={() => attendCourse(course.CourseId, "attendCourse")}>
                Attend Course
              </button>
            )
          ) : (
            <div className="workout-login">Login to attend this course</div>
          )}
        </div>
      </div>
      <div>
        <div className="workout-time">
          <Calendar size="17" color="black" className="icon" />
          {course.EveryWeek == 1 ? (
            <div>Every {moment(course.StartTime).format("dddd")}</div>
          ) : (
            <div>{moment(course.StartTime).format("DD MMM")}</div>
          )}
        </div>
        <div className="workout-attends">
          <Clock size="17" color="black" className="icon" />
          {course.StartTime.split("T")[1]} - {course.EndTime.split("T")[1]}
        </div>
        <div className="workout-attends">
          <People size="17" color="black" className="icon" />
          <span className="atd">
            {numberOfAttended}/{course.MaxAttendants}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Course;
