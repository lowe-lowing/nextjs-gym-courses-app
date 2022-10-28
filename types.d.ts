// import { type } from "os";
export {};
declare global {
  type UserObject = {
    IsAdmin: number;
    UserId: number;
    Email: string;
    Password: string;
    LastName: string;
    FirstName: string;
    IsInstructor: number;
  };

  type CourseObject = {
    EndTime: string;
    CourseId: number;
    Name: string;
    Description: string;
    StartTime: string;
    EveryWeek: number;
    Attends: string;
    MaxAttendants: number;
    Instructors: string;
  };
  type CourseObjectAdmin = {
    EndTime: string;
    CourseId: number;
    Name: string;
    Description: string;
    StartTime: string;
    EveryWeek: number;
    MaxAttendants: number;
    Attends: string;
    Students: string;
  };

  type StudentsAdmin = {
    UserId: number;
    Email: string;
    LastName: string;
    FirstName: string;
    Attends: string;
    IsAdmin: number;
    IsInstructor: number;
  };
  type StudentsInstructor = {
    UserId: number;
    Email: string;
    LastName: string;
    FirstName: string;
  };
  type InstructorsAdmin = {
    UserId: number;
    Email: string;
    FirstName: string;
    LastName: string;
  };

  type LoginForm = {
    Email: string;
    Password: string;
  };
  type StudentGrade = {
    UserId: number;
    Grade: string;
  };
  type GradeBody = {
    CourseId: number;
    Grades: [StudentGrade];
  };
}
