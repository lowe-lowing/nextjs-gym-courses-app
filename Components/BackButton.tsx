import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";

interface props {
  href: string;
  loadShallow: boolean;
}

const BackButton = ({ href, loadShallow }: props) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href, undefined, { shallow: loadShallow })}>
      <ArrowLeft />
    </button>
  );
};

export default BackButton;
