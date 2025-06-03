"use client";

import { Layout, Menu } from "antd";
import {
  ExceptionOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HasAccess, usePermify } from "@permify/react-role";
import PageAuthorized from "../unauthorize/page";
import { getItem } from "@/lib/LocalForage";
import HeaderLayout from "@/pages/profile/Header";
import Logo from "@/assets/img/logobener.png";
import Loading from "@/components/Loading";

const { Sider, Content, Header } = Layout;

const SidebarLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const { setUser } = usePermify();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getItem("user");
      if (user) {
        setUser({
          id: user?.cleaner_id,
          roles: user?.cleaner_id ? ["cleaner"] : ["customer"],
          permissions: user?.cleaner_id
            ? ["cleaner-activity"]
            : ["customer-activity"],
        });
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, [setUser]);

  const menuItems = [
    {
      key: "/cleaner/to-do",
      icon: <ExceptionOutlined />,
      label: "To Do",
    },
    {
      key: "/cleaner/daftar-tugas",
      icon: <ProfileOutlined />,
      label: "Daftar Tugas",
    },
    {
      key: "/cleaner/profil",
      icon: <UserOutlined />,
      label: "Profil",
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key !== pathname) {
      router.push(key);
    }
  };

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <HasAccess
      roles={["cleaner"]}
      permissions="cleaner-activity"
      renderAuthFailed={<PageAuthorized />}
      isLoading={<Loading />}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <img src={Logo.src} className="w-32 m-auto block" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              backgroundColor: "#fff",
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <HeaderLayout />
          </Header>

          <Content
            style={{
              padding: "24px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div className="p-4">
              <div className="bg-white rounded-xl w-full p-4 text-gray-700">
                {children}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </HasAccess>
  );
};

export default SidebarLayout;
