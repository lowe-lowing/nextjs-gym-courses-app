// import { type } from "os";
export {};
declare global {
  type UserObject = {
    Admin: number;
    UserId: number;
    Email: string;
    Password: string;
    LastName: string;
    FirstName: string;
  };

  type CourseObject = {
    EndTime: string;
    CourseId: number;
    Name: string;
    Description: string;
    StartTime: string;
    Attends: string;
    MaxAttendants: number;
  };
  type CourseObjectAdmin = {
    EndTime: string;
    CourseId: number;
    Name: string;
    Description: string;
    StartTime: string;
    MaxAttendants: number;
    Attends: string;
    Students: string;
  };

  type StudentsAdmin = {
    Admin: number;
    UserId: number;
    Email: string;
    Password: string;
    LastName: string;
    FirstName: string;
    Attends: string;
  };

  type LoginForm = {
    Email: string;
    Password: string;
  };
}
