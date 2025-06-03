"use client";
import Banner from "@/assets/img/logincleaner.jpg";
import InputField from "@/components/Input";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { setItem } from "@/lib/LocalForage";
import { usePermify } from "@permify/react-role";

const LoginCleanerComponent = () => {
  const { handleSubmit, control } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = usePermify();

  // Fungsi dipanggil saat form submit
  const onSubmit = async (data) => {
    let config = {
      method: "POST",
      url: "/api/auth/login/cleaner",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: data.email,
        password: data.password,
      },
    };

    const requestPromise = axios(config);

    toast.promise(requestPromise, {
      loading: "Mohon tunggu...",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          saveDataUser(response.data.data?.[0]);

          setUser({
            id: response.data.data?.[0]?.cleaner_id,
            roles: ["cleaner"],
            permissions: ["cleaner-activity"],
          });

          setTimeout(() => {
            router.push("/cleaner");
          }, 1000);
        }
        return "Berhasil login";
      },
      error: (error) => {
        console.error("Error:", error);
        return (
          error?.response?.data?.error ||
          "Something went wrong, please contact our team"
        );
      },
    });
  };

  const saveDataUser = async (data) => {
    await setItem("user", data);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-emerald-700 to-emerald-100 flex justify-center items-center">
      <div className="flex bg-white w-11/12 max-w-6xl h-[80vh] rounded-xl shadow-2xl overflow-hidden">
        {/* Gambar */}
        <div className="w-1/2 hidden md:block h-full">
          <img
            src={Banner.src}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Selamat Datang Cleaner
          </h1>
          <p className="text-center text-gray-600 italic mb-6">
            Masukkan email dan kata sandi Anda untuk melanjutkan
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-96">
            <InputField
              control={control}
              name="email"
              label="Email / Nomor Telepon"
              rules={{ required: "Email atau nomor telepon wajib diisi" }}
              placeholder="Masukkan email atau nomor telepon"
            />
            <InputField
              control={control}
              name="password"
              type="password"
              label="Kata Sandi"
              rules={{ required: "Kata sandi wajib diisi" }}
              placeholder="Masukkan kata sandi"
            />
            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="mt-3 "
                loading={loading}
                disabled={loading}
              >
                Masuk
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCleanerComponent;
