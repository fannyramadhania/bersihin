"use client";
import DatePickerField from "@/components/DatePicker";
import InputField from "@/components/Input";
import SelectField from "@/components/Select";
import TextareaField from "@/components/TextArea";
import { Checkbox, Button } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/LocalForage";

const BookingCard = ({
  optionPackage,
  optionTipeBangunan,
  optionLantaiBangunan,
}) => {
  const { handleSubmit, control, watch, setValue } = useForm();
  const [agreed, setAgreed] = useState(false);

  const [userData, setUserData] = useState({});

  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");

      setUserData(user);
    }

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    if (!agreed) {
      alert("Silakan setujui pernyataan pembayaran terlebih dahulu.");
      return;
    }

    try {
      const mainPackage = data.mainPackage;
      const jam = Number(data.jam);
      const hargaDasar = mainPackage?.price || 0;
      const tambahanPerJam = mainPackage?.tambah || 0;
      const jamTambahan = Math.max(jam - 1, 0);
      const totalTambahan = tambahanPerJam * jamTambahan;
      const pajak = hargaDasar * 0.05;
      const totalPembayaran = hargaDasar + totalTambahan + pajak;
      const customer_id = userData?.customer_id;

      // Buat FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("telp", data.telp);
      formData.append("address", data.address);
      formData.append("tipe", data.tipe);
      formData.append("lantai", data.lantai);
      formData.append("paket", mainPackage?.value);
      formData.append("jam", jam.toString());
      formData.append(
        "bookingDate",
        data.bookingDate.toISOString()?.split("T")[0]
      );
      formData.append("waktu", data.waktu);
      formData.append("catatan", data.catatan || "");
      formData.append("total", totalPembayaran.toString());
      formData.append("cus_id", customer_id);


      const requestPromise = axios.post("/api/order", formData);

      toast.promise(requestPromise, {
        loading: "Mohon tunggu...",
        success: (response) => {
          if (response.status === 200 || response.status === 201) {
          }

          setTimeout(() => {
            router.push("/customer/riwayat");
          }, 1000);
          return "Berhasil melakukan order";
        },
        error: (error) => {
          console.error("Error:", error);
          return (
            error?.response?.data?.error ||
            "Terjadi kesalahan, silakan hubungi tim support."
          );
        },
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Terjadi kesalahan internal.");
    }
  };

  const waktuOption = [
    { label: "09:00", value: "09:00" },
    { label: "12:00", value: "12:00" },
    { label: "14:00", value: "14:00" },
    { label: "16:00", value: "16:00" },
  ];

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const hitungPajak = (hargaProduk) => {
    const pajak = hargaProduk * 0.05;
    return pajak;
  };

  const pembayaranDetail = (param) => {
    setValue("mainPackage", param);
  };

  function finalPrice() {
    const mainPackage = watch("mainPackage");
    const jam = Number(watch("jam"));

    if (!mainPackage || !mainPackage.price) return 0;

    const hargaDasar = mainPackage.price;
    const tambahanPerJam = mainPackage.tambah || 0;
    const jamTambahan = Math.max(jam - 1, 0);
    const totalTambahan = tambahanPerJam * jamTambahan;
    const pajak = hitungPajak(hargaDasar);

    return hargaDasar + totalTambahan + pajak;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div>
        <p className="font-bold mb-4">Data Diri & Data Rumah</p>

        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/2">
            <InputField
              control={control}
              name="name"
              label="Nama"
              rules={{ required: "Nama wajib diisi" }}
              placeholder="Masukkan nama"
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              control={control}
              name="telp"
              label="Nomor Telepon"
              rules={{ required: "No telpon wajib diisi" }}
              placeholder="Masukkan No telpon"
            />
          </div>
        </div>

        <div className="w-full">
          <TextareaField
            control={control}
            name="address"
            label="Alamat"
            rules={{ required: "Alamat wajib diisi" }}
            placeholder="Masukkan Alamat"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/2">
            <SelectField
              control={control}
              name="tipe"
              label="Tipe Bangunan"
              options={optionTipeBangunan}
              rules={{ required: "Wajib memilih Tipe Bangunan" }}
              placeholder="Pilih tipe"
            />
          </div>
          <div className="w-full md:w-1/2">
            <SelectField
              control={control}
              name="lantai"
              label="Lantai Rumah"
              options={optionLantaiBangunan}
              rules={{ required: "Wajib memilih lantai rumah" }}
              placeholder="Pilih jumlah lantai"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-bold mb-4">Paket & Jadwal Kedatangan</p>

        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/2">
            <SelectField
              control={control}
              name="paket"
              label="Paket"
              funcCondition={(e) => pembayaranDetail(e)}
              options={optionPackage}
              rules={{ required: "Wajib memilih paket" }}
              placeholder="Pilih paket"
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              control={control}
              name="jam"
              label="Durasi"
              suffix={<p>Jam</p>}
              rules={{ required: "Jam wajib diisi" }}
              placeholder="Masukkan Jam"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
         
            <DatePickerField
              control={control}
              name="bookingDate"
              label="Tanggal Kunjungan"
              rules={{ required: "Tanggal wajib diisi" }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <SelectField
              control={control}
              name="waktu"
              label="Waktu"
              options={waktuOption}
              rules={{ required: "Wajib memilih paket" }}
              placeholder="Pilih paket"
            />
          </div>
        </div>

        <div className="w-full">
          <TextareaField
            control={control}
            name="catatan"
            label="Catatan"
            placeholder="Masukkan catatan"
          />
        </div>
      </div>

      {watch("paket") && watch("jam") && (
        <>
          {" "}
          <div className="mt-10">
            <p className="font-bold mb-4">Pembayaran</p>

            <div className="flex justify-between mb-2">
              <p>Paket {watch("mainPackage")?.label}</p>
              <p>{formatRupiah(watch("mainPackage")?.price)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tambahan {watch("jam") - 1} jam </p>
              <p>
                {formatRupiah(
                  watch("mainPackage")?.tambah * (watch("jam") - 1)
                )}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Pajak platform 2%</p>
              <p>{formatRupiah(hitungPajak(watch("mainPackage")?.price))}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Total</p>
              <p className="text-blue-500 font-semibold">
                {formatRupiah(finalPrice())}
              </p>
            </div>
          </div>
          <div className="flex items-start mt-2">
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <p className="ml-2 text-red-700 italic">
              Dengan ini saya menyatakan bersedia melakukan pembayaran penuh
              setelah layanan selesai diberikan, sesuai dengan harga yang
              tertera.
            </p>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <Button htmlType="submit" type="primary" className="mt-10">
          Order
        </Button>
      </div>
    </form>
  );
};

export default BookingCard;
