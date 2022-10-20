import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";
import { NextPage } from "next";
import Header from "./Header";
type props = {
  children: ReactNode;
};
const Layout: NextPage<props> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Lowes Workouts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main-container">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;