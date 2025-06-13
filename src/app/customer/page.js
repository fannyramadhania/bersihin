"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Account() {
  const router = useRouter();

  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-white  px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800  mb-2">
          Selamat Datang di <span className="text-blue-600">Bersih.in</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600  mb-6 max-w-md">
          Kami siap membantu Anda menjaga kebersihan rumah dan ruang kerja Anda.
          Pesan layanan kami sekarang dan nikmati kenyamanan tanpa repot!
        </p>
        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          onClick={() => router.push("/customer/order")}
        >
          Pesan Sekarang
        </Button>
      </div>
    </>
  );
}
