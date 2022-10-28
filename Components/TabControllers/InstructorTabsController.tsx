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

type props = {
  courses: [CourseObjectAdmin];
  students: [StudentsAdmin];
};
const InstructorTabsController: NextPage<props> = ({ courses, students }) => {
  const router = useRouter();
  const tab: string = router.query.tab as string;
  const id: number | null = (parseInt(router.query.id as string) as number) || null;
  const isTabOne = tab === "courses" || tab == null;
  const isTabTwo = tab === "students";
  const isInspector = id !== null;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="h-full flex flex-row">
      {!loading && <div>Loading...</div>}
      <div className="bg-secondary flex flex-col">
        <Link href="/instructor?tab=courses">
          <div className={isTabOne ? "tabPick active" : "tabPick"}>Your Courses</div>
        </Link>
        <Link href="/instructor?tab=students">
          <div className={isTabTwo ? "tabPick active" : "tabPick"}>Your Students</div>
        </Link>
      </div>
      <AnimatePresence>
        <div className="w-full p-10 flex flex-col items-center">
          {isTabOne &&
            (isInspector ? (
              <CourseInspect course={courses.find((x) => x.CourseId === id)} />
            ) : (
              <CoursesTab courses={courses} />
            ))}
          {isTabTwo && <StudentsTab students={students} />}
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
