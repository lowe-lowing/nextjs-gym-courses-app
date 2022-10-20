import { Clock, People, ArrowRight, Calendar } from "iconsax-react";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  courses: [CourseObjectAdmin];
};

const CoursesTab: NextPage<Props> = ({ courses }) => {
  // console.log(courses);
  const router = useRouter();

  return (
    <>
      {courses?.map((course) => (
        <div key={course.CourseId} className="workout-container">
          <div>
            <div className="workout-name">{course.Name}</div>
            <div className="workout-desc">{course.Description}</div>
            <button onClick={() => router.push(`/admin?tab=courses&edit=${course.CourseId}`)} className="edit-btn">
              Edit <ArrowRight size="20" />
            </button>
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
              {course.Attends?.split(",").length || 0}/{course.MaxAttendants}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CoursesTab;

// fixa styling på tabcontainer
// fixa students tab
// fixa edit course
// fixa add course
