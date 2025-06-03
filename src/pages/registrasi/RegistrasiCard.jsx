"use client";

import Banner from "@/assets/img/regis.jpg";
import InputField from "@/components/Input";
import TextareaField from "@/components/TextArea";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterCard = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    // Konfigurasi request axios
    let config = {
      method: "post",
      url: `/api/auth`,
      data: formData, // Menggunakan formData untuk mengirim file
    };

    const requestPromise = axios(config);

    toast.promise(requestPromise, {
      loading: "Mohon tunggu...",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
        return "Berhasil registrasi"; // Pesan sukses untuk toast
      },
      error: (error) => {
        console.error("Error:", error);
        return (
          error?.response?.data?.error ||
          "Something went wrong, please contact our team"
        ); // Pesan error jika ada kesalahan
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-700 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="m-8">
          <h2 className="text-2xl font-bold text-gray-800">Buat Akun</h2>
          <p className="text-gray-500">
            Siap untuk hidup lebih bersih? Daftar sekarang!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 px-8">
              <InputField
                control={control}
                name="name"
                label="Nama"
                prefix={<UserOutlined />}
                rules={{ required: "Nama wajib diisi" }}
                placeholder="Masukkan nama"
              />
              <InputField
                control={control}
                name="email"
                label="Email"
                prefix={<MailOutlined />}
                rules={{
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email tidak valid",
                  },
                }}
                placeholder="Masukkan email"
              />
              <InputField
                control={control}
                name="phone"
                label="Nomor Telepon"
                prefix={<PhoneOutlined />}
                rules={{ required: "Nomor telepon wajib diisi" }}
                placeholder="Masukkan nomor telepon"
              />
              <TextareaField
                control={control}
                name="address"
                label="Alamat"
                rules={{ required: "Alamat wajib diisi" }}
                placeholder="Masukkan alamat"
              />
            </div>

            <div className="w-full lg:w-1/2 px-8">
              <InputField
                control={control}
                name="password"
                type="password"
                label="Kata Sandi"
                rules={{ required: "Kata sandi wajib diisi" }}
                placeholder="Masukkan kata sandi"
              />
              <InputField
                control={control}
                name="confirmPassword"
                type="password"
                label="Konfirmasi Kata Sandi"
                rules={{
                  required: "Konfirmasi kata sandi wajib diisi",
                  validate: (value) =>
                    value === password || "Konfirmasi tidak cocok",
                }}
                placeholder="Masukkan ulang kata sandi"
              />

              <div className="flex items-center mb-4">
                <Checkbox />
                <p className="text-sm text-gray-500 ml-2">
                  Dengan mendaftar, Anda menyetujui{" "}
                  <span className="text-blue-500 font-bold">
                    Ketentuan Layanan
                  </span>{" "}
                  dan{" "}
                  <span className="text-blue-500 font-bold">
                    Kebijakan Privasi
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="m-6">
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit" className="mt-3">
                Daftar
              </Button>
            </div>
            <p className="text-end mt-2 text-gray-500">
              Sudah punya akun?{" "}
              <span
                className="font-bold text-blue-500 cursor-pointer hover:text-gray-600"
                onClick={() => router.push("/login")}
              >
                Masuk
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
