import "../styles/app.css";
import type { AppProps } from "next/app";
import Layout from "../Components/Layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import AppCtx from "../lib/useContext";
import { useState } from "react";

// type initialProps = AppProps & {
//   user?: UserObject;
// };
const sample = {
  user: {
    Admin: 0,
    UserId: 0,
    Email: "",
    Password: "string",
    LastName: "string",
    FirstName: "string",
  } as UserObject,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<UserObject | null>(null);
  return (
    <AppCtx.Provider value={{ currentUser, setCurrentUser }}>
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
