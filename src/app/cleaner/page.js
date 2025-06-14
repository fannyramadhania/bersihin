"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();

  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-white  px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800  mb-2">
          Selamat Datang di <span className="text-blue-600">Bersih.in</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600  mb-6 max-w-md">
          Silakan periksa daftar tugas Anda hari ini dan kerjakan dengan
          semaksimal mungkin untuk hasil terbaik.
        </p>

        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          onClick={() => router.push("/cleaner/to-do")}
        >
          Lihat Perkerjaan
        </Button>
      </div>
    </>
  );
}
