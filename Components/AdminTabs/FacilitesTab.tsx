import { ArrowDown, ArrowDown2, ArrowDown3, ArrowUp2, Dropbox } from "iconsax-react";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

interface props {
  facilities: Facility[];
}
const FacilitesTab: NextPage<props> = ({ facilities }) => {
  const [facilitiesState, setFacilitiesState] = useState<Facility[]>(facilities);

  const [formIsShown, setFormIsShown] = useState<boolean>(false);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    const result = await fetch("/api/admin/addFacility", {
      method: "POST",
      body: JSON.stringify({
        City: target.city.value,
        Address: target.address.value,
        Name: target.facilityName.value,
      }),
    });
    if (result.status == 200) {
      const parsed = await result.json();

      setFacilitiesState((state) => [
        ...state,
        {
          FacilityId: parsed[1][0].lastId,
          City: target.city.value,
          Address: target.address.value,
          Name: target.facilityName.value,
        } as Facility,
      ]);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  return (
    <div>
      <label htmlFor="facilities" className="font-bold flex gap-5">
        Add facility:
        {formIsShown ? (
          <ArrowDown2 onClick={() => setFormIsShown(false)} className="hover:cursor-pointer" />
        ) : (
          <ArrowUp2 onClick={() => setFormIsShown(true)} className="hover:cursor-pointer" />
        )}
      </label>
      {formIsShown && (
        <form onSubmit={(e) => handleAdd(e)} name="facilities" className="mb-2 flex flex-col gap-1">
          <div className="">
            <div className="text-sm">Name:</div>
            <input
              required
              type="text"
              name="facilityName"
              placeholder="Name..."
              className="bg-secondary p-1 rounded-lg"
            />
          </div>
          <div className="">
            <div className="text-sm">City:</div>
            <input required type="text" name="city" placeholder="City..." className="bg-secondary p-1 rounded-lg" />
          </div>
          <div className="">
            <div className="text-sm">Address:</div>
            <input
              required
              type="text"
              name="address"
              placeholder="Address..."
              className="bg-secondary p-1 rounded-lg"
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {facilitiesState.map((facility, i) => (
            <Link key={i} href={`admin?tab=facilities&facilityId=${facility.FacilityId.toString()}`} shallow={true}>
              <tr className="hover:bg-secondary hover:cursor-pointer">
                <td>{facility.Name}</td>
                <td>{facility.City}</td>
                <td>{facility.Address}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilitesTab;
