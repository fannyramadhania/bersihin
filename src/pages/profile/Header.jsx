"use client";
import { getItem, removeItem } from "@/lib/LocalForage";
import { LogoutOutlined } from "@ant-design/icons";
import { usePermify } from "@permify/react-role";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HeaderLayout = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const { setUser } = usePermify();
  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");
      setUserData(user);
    }

    fetchUser();
  }, []);

  async function handleLogout() {
    const user = await removeItem("user");
    setUser(null);

    toast.success("Berhasil logout");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
    // Redirect ke halaman login
  }

  return (
    <>
      {" "}
      <span className="text-gray-700 text-base font-medium">
        Halo , {userData?.name}
      </span>
      <Button
        icon={<LogoutOutlined />}
        danger
        type="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default HeaderLayout;
