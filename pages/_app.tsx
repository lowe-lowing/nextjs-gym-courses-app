import "../styles/app.css";
import type { AppProps } from "next/app";
import Layout from "../Components/Layout";
import AppCtx from "../lib/useContext";
import { useState } from "react";
import { Router } from "next/router";
import nProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<UserObject | null>(null);
  const [studentGrades, setStudentGrades] = useState<StudentGrade[] | null>(null);

  return (
    <AppCtx.Provider value={{ currentUser, setCurrentUser, studentGrades, setStudentGrades }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppCtx.Provider>
  );
}

export default MyApp;

// export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
//   const user = req.session.user;

//   if (user === undefined) {
//     res.setHeader("location", "/login");
//     res.statusCode = 302;
//     res.end();
//     return {
//       props: {
//         user: {
//           admin: 0,
//           UserId: 0,
//           Email: "",
//           Password: "string",
//           LastName: "string",
//           FirstName: "string",
//         } as UserObject,
//       },
//     };
//   }

//   return {
//     props: { user: req.session.user },
//   };
// }, sessionOptions);
