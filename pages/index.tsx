import type { NextPage } from "next";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import AppCtx from "../lib/useContext";
import Course from "../Components/Course";

type initialProps = {
  courses: CourseObject[];
  departments: Department[];
  user?: UserObject;
};

const Home: NextPage<initialProps> = ({ courses, departments, user }) => {
  const [coursesFilter, setCoursesFilter] = useState(courses);
  const [filters, setFilters] = useState<Filters>({
    Name: "",
    Facility: "",
    Instructor: "",
    BodyParts: [],
  });

  const appContext = useContext(AppCtx);

  const handleNameFilter = (filter: string) => {
    const temp = {
      ...filters,
      Name: filter,
    } as Filters;

    applyFilters(temp);
    setFilters(temp);
  };

  const handleFacilityFilter = (filter: string) => {
    const temp = {
      ...filters,
      Facility: filter,
    } as Filters;

    applyFilters(temp);
    setFilters(temp);
  };

  const handleInstructorFilter = (filter: string) => {
    const temp = {
      ...filters,
      Instructor: filter,
    } as Filters;

    applyFilters(temp);
    setFilters(temp);
  };

  const handleBPFilter = (id: string, checked: boolean) => {
    const temp = {
      ...filters,
      BodyParts: checked ? [...filters.BodyParts, parseInt(id)] : filters.BodyParts.filter((x) => x != parseInt(id)),
    } as Filters;

    applyFilters(temp);
    setFilters(temp);
  };

  const applyFilters = (temp: Filters) => {
    setCoursesFilter(
      courses.filter(
        (course) =>
          course.Name.toLowerCase().includes(temp.Name.toLowerCase()) &&
          course.FacilityName.toLowerCase().includes(temp.Facility.toLowerCase()) &&
          course.Instructors.toLowerCase().includes(temp.Instructor.toLowerCase()) &&
          (temp.BodyParts.length > 0 ? temp.BodyParts.indexOf(course.DepartmentId) > -1 : true)
      )
    );
  };

  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <div className="relative w-full md:w-11/12 lg:w-6/7 xl:w-full">
        <div className="flex flex-col w-full items-end md:items-center">
          <div className="w-2/3 md:w-[500px] mr-2">
            {coursesFilter.map((course) => (
              <Course course={course} user={user} key={course.CourseId} />
            ))}
          </div>
        </div>
        {/* filter sidebar */}
        <div className="filter-sidebar absolute top-5 bg-secondary rounded-lg p-2 flex flex-col gap-2 ml-2">
          <div className="text-lg">Filters:</div>
          <div>
            <div className="font-bold text-xs">Course Name:</div>
            <input
              type="text"
              placeholder="Course Name..."
              className="rounded-md p-1 w-[7rem] md:w-[10rem]"
              onChange={(e) => handleNameFilter(e.currentTarget.value)}
            />
          </div>
          <div>
            <div className="font-bold text-xs">Facility:</div>
            <input
              type="text"
              placeholder="Facility..."
              className="rounded-md p-1 w-[7rem] md:w-[10rem]"
              onChange={(e) => handleFacilityFilter(e.currentTarget.value)}
            />
          </div>
          <div>
            <div className="font-bold text-xs">Instructor:</div>
            <input
              type="text"
              placeholder="Instructor..."
              className="rounded-md p-1 w-[7rem] md:w-[10rem]"
              onChange={(e) => handleInstructorFilter(e.currentTarget.value)}
            />
          </div>
          <div>
            <div className="font-bold text-xs">Body Part:</div>
            {departments.map((department, i) => (
              <div key={i} className="flex content-center gap-1">
                <input
                  type="checkbox"
                  name="test"
                  id={department.DepartmentId.toString()}
                  onChange={(e) => handleBPFilter(e.currentTarget.id, e.currentTarget.checked)}
                />
                <label htmlFor={department.DepartmentId.toString()}>{department.BodyPart}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const result = await fetch("http://localhost:3000/api/getCourses");
  const courses = await result.json();

  const departmentResult = await fetch("http://localhost:3000/api/admin/getDepartments");
  const departments = await departmentResult.json();

  if (user === undefined) {
    return {
      props: {
        courses,
        departments,
        user: null,
      },
    };
  }
  return {
    props: { courses, departments, user: user },
  };
}, sessionOptions);
