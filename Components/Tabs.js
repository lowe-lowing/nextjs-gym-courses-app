import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { TabHead, TabContainer, TabBody, Tab } from "../styles/styles";
import CoursesTab from "./CoursesTab.tsx";
import AddCourseTab from "./AddCourseTab.tsx";
import StudentsTab from "./StudentsTab.tsx";
import CourseEdit from "./CourseEdit";

const Tabs = ({ router, courses, students }) => {
  const {
    query: { tab, edit },
  } = router;

  const isTabOne = tab === "courses" || tab == null;
  const isTabTwo = tab === "add-course";
  const isTabThree = tab === "students";
  const isEditor = edit != undefined;

  return (
    <TabContainer>
      <TabHead>
        <Tab selected={isTabOne} onClick={() => router.push("/admin?tab=courses")}>
          <a>Courses</a>
        </Tab>
        <Tab selected={isTabTwo} onClick={() => router.push("/admin?tab=add-course")}>
          <a>Add Course</a>
        </Tab>
        <Tab selected={isTabThree} onClick={() => router.push("/admin?tab=students")}>
          <a>Students</a>
        </Tab>
      </TabHead>
      <TabBody>
        {isTabOne &&
          (isEditor ? (
            <CourseEdit course={courses.find((x) => x.CourseId === parseInt(edit))} />
          ) : (
            <CoursesTab courses={courses} />
          ))}
        {isTabTwo && <AddCourseTab />}
        {isTabThree && <StudentsTab students={students} />}
      </TabBody>
    </TabContainer>
  );
};

export default withRouter(Tabs);
