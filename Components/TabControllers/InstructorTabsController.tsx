import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CourseInspect from "../InstructorTabs/CourseInspect";
import CoursesTab from "../InstructorTabs/CoursesTab";
import StudentsTab from "../InstructorTabs/StudentsTab";
import { motion } from "framer-motion";
import Motion from "../../lib/Motion";
import { AnimatePresence } from "framer-motion";
import StudentInspect from "../InstructorTabs/StudentInspect";

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
  instructors: InstructorsAdmin[];
};

const InstructorTabsController: NextPage<props> = ({ courses, students, instructors }) => {
  const router = useRouter();
  const tab: string = router.query.tab as string;
  const id: number | null = (parseInt(router.query.id as string) as number) || null;

  const isCoursesTab = tab === "courses" || tab == null;
  const isInspector = id !== null;
  const isStudentsTab = tab === "students";

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="min-h-full flex flex-row">
      {!loading && <div>Loading...</div>}
      <div className="bg-secondary flex flex-col min-h-screen">
        <Link href="/instructor?tab=courses">
          <div className={isCoursesTab ? "tabPick active" : "tabPick"}>Your Courses</div>
        </Link>
        <Link href="/instructor?tab=students">
          <div className={isStudentsTab ? "tabPick active" : "tabPick"}>Your Students</div>
        </Link>
      </div>
      <AnimatePresence>
        <div className="w-full p-10 flex flex-col items-center">
          {isCoursesTab &&
            (isInspector ? (
              <CourseInspect course={courses.find((x) => x.CourseId === id)} instructors={instructors} />
            ) : (
              <CoursesTab courses={courses} instructors={instructors} />
            ))}
          {isStudentsTab &&
            (isInspector ? (
              <StudentInspect student={students.find((x) => x.UserId === id)} courses={courses} />
            ) : (
              <StudentsTab students={students} />
            ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default InstructorTabsController;

// const variants = {
//   hidden: { opacity: 1, x: 0, y: 500 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 1, x: 0, y: 200 },
// };
// const variants2 = {
//   hidden: { opacity: 1, x: 0, y: -500 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 1, x: 0, y: -200 },
// };
// const variants3 = {
//   hidden: { opacity: 1, x: 100, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 1, x: -100, y: 0 },
// };

// <Motion variant={variants}>
// </Motion>
