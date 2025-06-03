"use client";

import React, { useEffect, useState } from "react";
import { CaretRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Collapse, theme, Select, Button } from "antd";
import { useForm } from "react-hook-form";
import SelectField from "@/components/Select";
import TextareaField from "@/components/TextArea";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getItem } from "@/lib/LocalForage";

const statusOption = [
  { label: "Disetujui", value: "AWAITING" },
  { label: "Ditolak", value: "CANCEL" },
];

const CleanerTask = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");
      console.log(user);
      setUserData(user);
    }

    fetchUser();
  }, []);

  const { handleSubmit, control, watch, setValue } = useForm();

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const {
    data: dataOrder,
    isLoading: isLoading,
    refetch,
    error: error,
  } = useQuery({
    queryKey: ["getOpenOrder"],
    queryFn: async () => {
      const res = await fetch("/api/order?status=OPEN");
      return res.json();
    },
  });
  const formatWaktu = (time) => {
    const date = new Date(time);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onSubmit = async (formValues, taskId) => {
    console.log("Form Values:", formValues);
    console.log("Task ID:", taskId);

    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("status", formValues.status);
    formData.append("cleaner_id", userData?.cleaner_id); // Ganti dengan ID cleaner yang sedang login

    if (formValues.status == "CANCEL") {
      formData.append("reason_cancel", formValues.alasan || "");
    }

    const res = await fetch("/api/order", {
      method: "PATCH",
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      refetch(); // Refresh data setelah update
      toast.success("Status berhasil diperbarui!");
      // Tambahkan logika refresh data / re-render jika perlu
    } else {
      toast.error("Gagal memperbarui status: " + result.error);
    }
  };

  const getItems = (panelStyle) => {
    if (!dataOrder?.data || dataOrder.data.length === 0) {
      return [
        {
          key: "not-found",
          label: (
            <div className="text-gray-500 flex items-center">
              <InfoCircleOutlined className="mr-2 text-yellow-500" />
              Tidak ada data tugas
            </div>
          ),
          children: (
            <p className="text-gray-400 text-sm">
              Tidak ditemukan tugas baru untuk ditampilkan.
            </p>
          ),
          style: panelStyle,
        },
      ];
    }

    return dataOrder.data.map((task) => ({
      key: task.id,
      label: (
        <div className="flex justify-between">
          <div className="flex items-center">
            <InfoCircleOutlined style={{ color: "#DC2421" }} />
            <p className="ml-2 text-red-600">Tugas Baru</p>
          </div>
          <p className="text-blue-400">{formatWaktu(task.created_at)}</p>
        </div>
      ),
      children: (
        <div>
          <p className="font-bold text-gray-700">Detail Customer</p>
          <div className="mt-4">
            {/* Detail informasi */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-semibold">{task.nama}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">No Telepon</p>
              <p className="font-semibold">{task.phone}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-semibold">{task.address}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Waktu</p>
              <p className="font-semibold">
                {task.time_booking}, {task.waktu}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Paket</p>
              <p className="font-semibold">{task.Package.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Durasi</p>
              <p className="font-semibold">{task.durasi} jam</p>
            </div>

            <SelectField
              control={control}
              name="status"
              label="Status"
              options={statusOption}
              rules={{ required: "Wajib memilih status" }}
              placeholder="Pilih status"
            />
            <div className="mt-2">
              {watch("status") == 2 && (
                <TextareaField
                  control={control}
                  name="alasan"
                  rules={
                    watch("status") == 1 ? { required: "Jam wajib diisi" } : {}
                  }
                  label="Alasan"
                  placeholder="Masukkan alasan"
                />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              onClick={handleSubmit((values) =>
                onSubmit(values, task.order_id)
              )}
            >
              Kirim
            </Button>
          </div>
        </div>
      ),
      style: panelStyle,
    }));
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={[]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle)}
    />
  );
};

export default CleanerTask;
