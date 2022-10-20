import { NextPage } from "next";
import React, { MouseEvent, useContext } from "react";
import { Calendar, Clock, People } from "iconsax-react";
import AppCtx from "../lib/useContext";
import moment from "moment";

type initialProps = {
  courses: [CourseObject];
};

const Container: NextPage<initialProps> = ({ courses }) => {
  const appContext = useContext(AppCtx);
  const currentUser = appContext?.currentUser;

  const attendCourse = async (CourseId: number, operation: string, i: number) => {
    const result = await fetch(`/api/${operation}`, {
      method: "POST",
      body: JSON.stringify({
        UserId: currentUser?.UserId,
        CourseId,
      }),
    });

    if (result.status === 200) {
      let myContainer = document.querySelectorAll(".to-replace")[i] as HTMLElement;
      const memb = document.querySelectorAll(".atd")[i];
      const text = memb.textContent?.split("/");
      if (operation == "attendCourse") {
        const div = document.createElement("div");
        div.classList.add("unattend");
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("workout-attended");
        innerDiv.innerHTML = "You are signed up";
        const btn = document.createElement("button");
        btn.onclick = () => attendCourse(CourseId, "unattendCourse", i);
        btn.innerHTML = "Unattend";
        div.appendChild(innerDiv);
        div.appendChild(btn);
        myContainer.replaceChildren(div);
        const num: number = parseInt(memb.textContent?.split("/")[0] || "0") + 1;
        text?.splice(0, 1, num.toString());
        memb.innerHTML = text?.join("/") || "";
      } else {
        const btn = document.createElement("button");
        btn.classList.add("btn-attend");
        btn.onclick = () => attendCourse(CourseId, "attendCourse", i);
        btn.innerHTML = "Attend Course";
        myContainer.replaceChildren(btn);
        const num: number = parseInt(memb.textContent?.split("/")[0] || "0") - 1;
        text?.splice(0, 1, num.toString());
        memb.innerHTML = text?.join("/") || "";
      }
    } else {
      alert("error");
    }
  };

  return (
    <div className="container">
      {courses?.map((course, i) => (
        <div key={course.CourseId} className="workout-container">
          <div className="workout-container-div">
            <div className="workout-name">{course.Name}</div>
            <div className="workout-desc">{course.Description}</div>
            <div className="to-replace">
              {currentUser ? (
                course.Attends?.split(",").indexOf(currentUser.UserId.toString()) > -1 ? (
                  <div className="unattend">
                    <div className="workout-attended">You are signed up</div>
                    <button onClick={(e) => attendCourse(course.CourseId, "unattendCourse", i)}>Unattend</button>
                  </div>
                ) : (
                  <button className="btn-attend" onClick={(e) => attendCourse(course.CourseId, "attendCourse", i)}>
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
              {moment(course.StartTime).format("DD MMM")}
            </div>
            <div className="workout-attends">
              <Clock size="17" color="black" className="icon" />
              {course.StartTime.split("T")[1]} - {course.EndTime.split("T")[1]}
            </div>
            <div className="workout-attends">
              <People size="17" color="black" className="icon" />
              <span className="atd">
                {course.Attends?.split(",").length || 0}/{course.MaxAttendants}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Container;
