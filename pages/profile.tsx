import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Course from "../Components/Course";
import { sessionOptions } from "../lib/session";
import AppCtx from "../lib/useContext";

type initialProps = {
  courses: CourseObject[];
  user?: UserObject;
};

const Profile: NextPage<initialProps> = ({ user, courses }) => {
  const [s3ImageUrl, setS3ImageUrl] = useState<string>(user?.ProfilePicture || "default_pfp.png");
  const [selectedfile, setFile] = useState<File | null>(null);

  const appContext = useContext(AppCtx);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = e.currentTarget.filepicker.files[0];
    if (!file) return;

    e.currentTarget.reset();
    setFile(null);

    const { url } = await fetch("/api/s3Url").then((res) => res.json());

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];

    const result = await fetch("/api/setUserPfp", {
      method: "POST",
      body: JSON.stringify({
        UserId: user?.UserId,
        pfpUrl: imageUrl,
      }),
    });
    if (result.status === 200) {
      setS3ImageUrl(imageUrl);
    } else {
      console.log("error");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setFile(selected);
  }

  useEffect(() => {
    if (user) {
      appContext?.setCurrentUser(user);
    }
  }, []);

  return (
    <div className="main-container">
      <div className="bg-profileInfo rounded-xl p-5 flex flex-col gap-3 mb-5 w-4/5 md:w-2/5">
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center">
          {/* <label htmlFor="filepick" className="bg-black">
          </label> */}
          <Image src={s3ImageUrl} alt="pfp" width="100" height="100" className="rounded-full w-1/2 aspect-square" />
          <div>
            <input type="file" name="filepicker" onChange={(e) => handleChange(e)} />
            <button type="submit" disabled={selectedfile == null} className="submit-grades">
              Submit
            </button>
          </div>
        </form>
        <div>
          <div className="font-bold text-xs">Email:</div>
          <div>{appContext?.currentUser?.Email}</div>
        </div>
        <div className="flex flex-row gap-5">
          <div>
            {/* gör så man kan ändra sitt namn */}
            <div className="font-bold text-xs whitespace-nowrap">First Name:</div>
            <div>{appContext?.currentUser?.FirstName}</div>
          </div>
          <div>
            <div className="font-bold text-xs whitespace-nowrap">Last Name:</div>
            <div>{appContext?.currentUser?.LastName}</div>
          </div>
        </div>
      </div>
      <div className="font-bold text-lg">Attended Courses:</div>
      {courses
        .filter((course) => course.Attends.split(",").indexOf(user?.UserId.toString() || "") > -1)
        .map((course, i) => (
          <Course key={i} course={course} user={user} />
        ))}
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  const result = await fetch("http://localhost:3000/api/getCourses");
  const courses = await result.json();

  if (user === undefined) {
    return {
      props: {
        courses,
        user: null,
      },
    };
  }
  return {
    props: { courses, user },
  };
}, sessionOptions);

export default Profile;
