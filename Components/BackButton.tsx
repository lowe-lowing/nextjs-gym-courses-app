import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <ArrowLeft />
    </button>
  );
};

export default BackButton;
