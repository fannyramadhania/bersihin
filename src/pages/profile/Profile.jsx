"use client";
import avatar from "@/assets/img/avatarcus.png";
import { getItem } from "@/lib/LocalForage";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import avatarCleaner from "@/assets/img/avatarcleaner.png";

const ProfileComp = () => {
  const [userData, setUserData] = useState({});

  useEffect( () => {
  
    async function fetchUser() {
      const user = await getItem("user");
      console.log(user);
      setUserData(user);
    }

    fetchUser()
  }, []);
  
  return (
    <div className="flex flex-col items-center text-center mt-10 text-gray-700">
      {/* Avatar */}
      {userData?.status ? (
        <img src={avatarCleaner.src} alt="Avatar" className="w-36 mb-4" />
      ) : (
        <img src={avatar.src} alt="Avatar" className="w-32 mb-4" />
      )}

      {/* Info */}
      <div className="space-y-2">
        <div className="mb-4">
          <p className="text-sm text-gray-500">Nama</p>
          <p className="font-semibold">{userData?.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{userData?.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">No Telepon</p>
          <p className="font-semibold">{userData?.phone}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Alamat</p>
          <p className="font-semibold">{userData?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
