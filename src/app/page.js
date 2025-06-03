"use client";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/LocalForage";
import LandingPageCard from "@/pages/landing/LandingPage";
const LandingPage = () => {
  const [isAuthorize, setAuthorize] = useState(false);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");

      if (user) {
        setAuthorize(true);
        setRole(user.cleaner_id ? "cleaner" : "customer");
      }
    }

    fetchUser();
  }, []);
  return (
    <>
      <LandingPageCard isAuthorize={isAuthorize} role={role} />
    </>
  );
};

export default LandingPage;
