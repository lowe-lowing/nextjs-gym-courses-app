// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
// import type { User } from "../pages/api/user";

export const sessionOptions: IronSessionOptions = {
  password: "testPasswordtestPasswordtestPassword",
  cookieName: "testCockie",
  cookieOptions: {
    secure: false,
  },
};
// TODO:Fix process.env.NODE_ENV === "production" on secure

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user: UserObject | null;
  }
}
