import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import Course from "../Course";
import CourseAdmin from "../CourseAdmin";

interface props {
  courses: CourseObjectAdmin[];
  instructors: InstructorsAdmin[];
  facility?: Facility;
}

const FacilityTab = ({ facility, courses, instructors }: props) => {
  const [name, setName] = useState<string>(facility?.Name || "");
  const [city, setCity] = useState<string>(facility?.City || "");
  const [address, setAddress] = useState<string>(facility?.Address || "");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const router = useRouter();

  const initialValues = [facility?.Name, facility?.City, facility?.Address];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await fetch("/api/admin/editFacility", {
      method: "POST",
      body: JSON.stringify({
        facilityId: facility?.FacilityId,
        name,
        city,
        address,
      }),
    });
    if (result.status === 200) {
      router.reload();
    }
  };

  useEffect(() => {
    setIsEdited(JSON.stringify(initialValues) != JSON.stringify([name, city, address]));
  }, [name, city, address]);

  return (
    <div className="organizer">
      <BackButton href="/admin?tab=facilities" loadShallow={true} />
      <div className="add-coure-container">
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login-column">
              <span>Name:</span>
              <input
                required
                type="text"
                placeholder="Name..."
                name="facilityName"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              {/* <span className="errorMessage">{emailValidMessage}</span> */}
            </div>
            <div className="flex flex-col">
              <span>City:</span>
              <input
                required
                type="text"
                placeholder="City..."
                name="city"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col">
              <span>Address:</span>
              <input
                required
                type="text"
                placeholder="Address..."
                name="address"
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </div>
            <div className="flex">
              <button className="submit-grades" disabled={isEdited == false} type="submit">
                Change
              </button>
            </div>
          </form>
          <div className="font-bold text-2xl text-center mt-5 mb-[-15px]">Courses</div>
          {courses
            .filter((c) => c.FacilityName == facility?.Name)
            .map((course, i) => (
              <CourseAdmin key={i} course={course} instructors={instructors} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityTab;

// fix isEdited and edit facility
