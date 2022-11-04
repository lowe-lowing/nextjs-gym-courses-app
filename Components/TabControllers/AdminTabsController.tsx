import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AddCourseTab from "../AdminTabs/AddCourseTab";
import CourseEdit from "../AdminTabs/CourseEdit";
import CoursesTab from "../AdminTabs/CoursesTab";
import DepartmentsTab from "../AdminTabs/DepartmentsTab";
import FacilitesTab from "../AdminTabs/FacilitesTab";
import FacilityTab from "../AdminTabs/FacilityTab";
import InstructorsTab from "../AdminTabs/InstructorsTab";
import StudentsTab from "../AdminTabs/StudentsTab";
import StudentTab from "../AdminTabs/StudentTab";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  instructors: [InstructorsAdmin];
  departments: DepartmentFull[];
  facilities: Facility[];
};
const AdminTabsController: NextPage<props> = ({ courses, students, instructors, departments, facilities }) => {
  const router = useRouter();
  const tab: string = router.query.tab as string;
  const edit: number | null = (parseInt(router.query.edit as string) as number) || null;
  const id: number | null = (parseInt(router.query.id as string) as number) || null;
  const facilityId: number | null = (parseInt(router.query.facilityId as string) as number) || null;

  const isCoursesTab = tab === "courses" || tab == null;
  const isEditor = edit !== null;
  const isAddCoursesTab = tab === "add-course";
  const isStudentsTab = tab === "students";
  const isId = id !== null;
  const isInstructorsTab = tab === "instructors";
  const isDepartmentsTab = tab === "departments";
  const isFacilitiesTab = tab === "facilities";
  const isFacilityId = facilityId !== null;

  return (
    <div className="min-h-full flex flex-row">
      <div className={`bg-secondary flex flex-col min-h-screen ${isEditor || isId ? "smHidden" : ""}`}>
        <Link href="/admin?tab=courses">
          <div className={isCoursesTab ? "tabPick active" : "tabPick"}>Courses</div>
        </Link>
        <Link href="/admin?tab=add-course" shallow={true}>
          <div className={isAddCoursesTab ? "tabPick active" : "tabPick"}>Add Course</div>
        </Link>
        <Link href="/admin?tab=students">
          <div className={isStudentsTab ? "tabPick active" : "tabPick"}>Users</div>
        </Link>
        <Link href="/admin?tab=instructors">
          <div className={isInstructorsTab ? "tabPick active" : "tabPick"}>Instructors</div>
        </Link>
        <Link href="/admin?tab=departments">
          <div className={isDepartmentsTab ? "tabPick active" : "tabPick"}>Departments</div>
        </Link>
        <Link href="/admin?tab=facilities">
          <div className={isFacilitiesTab ? "tabPick active" : "tabPick"}>Facilites</div>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        {isCoursesTab &&
          (isEditor ? (
            <CourseEdit
              course={courses.find((x) => x.CourseId === edit)}
              instructors={instructors}
              facilities={facilities}
            />
          ) : (
            <CoursesTab courses={courses} instructors={instructors} />
          ))}
        {isAddCoursesTab && <AddCourseTab instructors={instructors} facilities={facilities} />}
        {isStudentsTab &&
          (isId ? <StudentTab student={students.find((x) => x.UserId === id)} /> : <StudentsTab students={students} />)}
        {isInstructorsTab && <InstructorsTab instructors={instructors} />}
        {isDepartmentsTab && <DepartmentsTab departments={departments} />}
        {isFacilitiesTab &&
          (isFacilityId ? (
            <FacilityTab
              facility={facilities.find((x) => x.FacilityId === facilityId)}
              courses={courses}
              instructors={instructors}
            />
          ) : (
            <FacilitesTab facilities={facilities} />
          ))}
      </div>
    </div>
  );
};

export default AdminTabsController;
