"use client";

import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import { getItem } from "@/lib/LocalForage";
import ViewRiwayat from "@/pages/cleaner/riwayat/ViewRiwayat";
import { useQuery } from "@tanstack/react-query";
import { Modal, Select, Input } from "antd";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const RiwayatCleaner = () => {
  const [userData, setUserData] = useState({});
  const [dataDetail, setDetailData] = useState({});
  const [open, setOpenModal] = useState(false);

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");
      setUserData(user);
    }
    fetchUser();
  }, []);

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

  const columns = useMemo(
    () => [
      {
        id: "nama",
        header: () => <p className="text-sm ">Nama</p>,
        accessorKey: "nama",
      },
      {
        id: "address",
        header: () => <p className="text-sm ">Alamat</p>,
        accessorKey: "address",
      },
      {
        id: "Package.name",
        header: () => <p className="text-sm ">Paket</p>,
        accessorKey: "Package.name",
      },
      {
        id: "time_booking",
        header: () => <p className="text-sm ">Waktu</p>,
        accessorKey: "time_booking",
        cell: ({ getValue }) => {
          const time_booking = getValue();
          return (
            <span className="capitalize font-medium">
              {formatWaktu(time_booking)}
            </span>
          );
        },
      },
      {
        id: "created_at",
        header: () => <p style={{ fontSize: 14, color: "#333" }}>Detail</p>,
        accessorKey: "created_at",
        cell: ({ row }) => {
          return (
            <span
              className="text-blue-400 hover:text-gray-600 cursor-pointer"
              onClick={() => {
                setDetailData(row.original);
                setOpenModal(true);
              }}
            >
              Lihat
            </span>
          );
        },
      },
      {
        id: "status",
        header: () => <p className="text-sm ">Status</p>,
        accessorKey: "status",
        cell: ({ getValue, row }) => {
          const status = getValue();
          const idTask = row.original.order_id;

          return (
            <Select
              className="w-52"
              onChange={(value) => {
                if (value === "CANCEL") {
                  setSelectedTaskId(idTask);
                  setShowModalCancel(true);
                } else {
                  onSubmit({ status: value }, idTask);
                }
              }}
              defaultValue={status}
              options={[
                { value: "AWAITING", label: "Menunggu kedatangan" },
                { value: "ON-PROCESS", label: "Sedang Dikerjakan" },
                { value: "DONE", label: "Selesai" },
                { value: "CANCEL", label: "Batal" },
              ]}
            />
          );
        },
      },
    ],
    []
  );

  const {
    data: dataOrder,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["getOpen"],
    queryFn: async () => {
      const res = await fetch("/api/order?cleaner_id=" + userData?.cleaner_id);
      return res.json();
    },
    enabled: !!userData?.cleaner_id,
  });

  const onSubmit = async (formValues, taskId) => {
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("status", formValues.status);

    if (formValues.status === "CANCEL") {
      formData.append("reason_cancel", formValues.alasan || "");
    }

    const res = await fetch("/api/order", {
      method: "PATCH",
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      refetch();
      toast.success("Status berhasil diperbarui!");
    } else {
      toast.error("Gagal memperbarui status: " + result.error);
    }
  };

  const handleCancelSubmit = () => {
    if (!cancelReason.trim()) {
      toast.error("Alasan pembatalan tidak boleh kosong.");
      return;
    }
    onSubmit({ status: "CANCEL", alasan: cancelReason }, selectedTaskId);
    setShowModalCancel(false);
    setCancelReason("");
    setSelectedTaskId(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableContainer datas={dataOrder?.data || []} columns={columns} />
      <ViewRiwayat setOpen={setOpenModal} open={open} dataDetail={dataDetail} />

      <Modal
        title="Alasan Pembatalan"
        open={showModalCancel}
        onCancel={() => {
          setShowModalCancel(false);
          setCancelReason("");
          setSelectedTaskId(null);
        }}
        onOk={handleCancelSubmit}
        okText="Kirim"
        cancelText="Batal"
      >
        <Input.TextArea
          rows={4}
          placeholder="Tulis alasan pembatalan..."
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default RiwayatCleaner;
