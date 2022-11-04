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
    ProfilePicture: string;
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
    DepartmentId: number;
    BodyPart: string;
    FacilityName: string;
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
    DepartmentId: number;
    BodyPart: string;
    Instructors: string;
    FacilityName: string;
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
  type CourseGrade = {
    CourseId: number;
    Grade: string;
  };
  type CourseGradeBody = {
    UserId: number;
    Grades: [CourseGrade];
  };
  type Department = {
    DepartmentId: number;
    BodyPart: string;
  };
  type DepartmentFull = {
    DepartmentId: number;
    BodyPart: string;
    AdminId: number;
  };
  type EditUserBody = {
    UserId: number;
    Email: string;
    FirstName: string;
    LastName: string;
    LevelChanged: boolean;
    InitLevel: number;
    Level: number;
  };
  type Facility = {
    FacilityId: number;
    City: string;
    Address: string;
    Name: string;
  };
  type Filters = {
    Name: string;
    Facility: string;
    Instructor: string;
    BodyParts: Array<number>;
  };
}
