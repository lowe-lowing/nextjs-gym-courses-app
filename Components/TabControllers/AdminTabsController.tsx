import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AddCourseTab from "../AdminTabs/AddCourseTab";
import CourseEdit from "../AdminTabs/CourseEdit";
import CoursesTab from "../AdminTabs/CoursesTab";
import InstructorsTab from "../AdminTabs/InstructorsTab";
import StudentsTab from "../AdminTabs/StudentsTab";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  instructors: [InstructorsAdmin];
};
const AdminTabsController: NextPage<props> = ({ courses, students, instructors }) => {
  const router = useRouter();
  const tab: string = router.query.tab as string;
  const edit: number | null = (parseInt(router.query.edit as string) as number) || null;

  const isTabOne = tab === "courses" || tab == null;
  const isTabTwo = tab === "add-course";
  const isTabThree = tab === "students";
  const isTabFour = tab === "instructors";
  const isEditor = edit !== null;

  return (
    <div className="min-h-full flex flex-row">
      <div className="bg-secondary flex flex-col min-h-screen">
        <Link href="/admin?tab=courses">
          <div className={isTabOne ? "tabPick active" : "tabPick"}>Courses</div>
        </Link>
        <Link href="/admin?tab=add-course">
          <div className={isTabTwo ? "tabPick active" : "tabPick"}>Add Course</div>
        </Link>
        <Link href="/admin?tab=students">
          <div className={isTabThree ? "tabPick active" : "tabPick"}>Users</div>
        </Link>
        <Link href="/admin?tab=instructors">
          <div className={isTabFour ? "tabPick active" : "tabPick"}>Instructors</div>
        </Link>
      </div>
      <div className="w-full p-10 flex flex-col items-center">
        {isTabOne &&
          (isEditor ? (
            <CourseEdit course={courses.find((x) => x.CourseId === edit)} />
          ) : (
            <CoursesTab courses={courses} />
          ))}
        {isTabTwo && <AddCourseTab />}
        {isTabThree && <StudentsTab students={students} />}
        {isTabFour && <InstructorsTab instructors={instructors} />}
      </div>
    </div>
  );
};

export default AdminTabsController;
