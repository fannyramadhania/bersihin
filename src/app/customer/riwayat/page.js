"use client";
import Loading from "@/components/Loading";
import TableContainer from "@/components/TableContainer";
import { getItem } from "@/lib/LocalForage";
import ViewRiwayat from "@/pages/cleaner/riwayat/ViewRiwayat";
import { EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const RiwayatPage = () => {
  const [userData, setUserData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const user = await getItem("user");
      console.log(user);
      setUserData(user);
    }

    fetchUser();
  }, []);

  const {
    data: dataRiwayat,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ["getRiwayat"],
    queryFn: async () => {
      const res = await fetch("/api/order?id=" + userData?.customer_id);
      return res.json();
    },
    enabled: !!userData?.customer_id,
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

  const columns = useMemo(
    () => [
      {
        id: "nama",
        header: () => <p className="text-sm dark:text-neutral-200">Nama</p>,
        accessorKey: "nama",
      },

      {
        id: "Package.name",
        header: () => <p className="text-sm dark:text-neutral-200">Paket</p>,
        accessorKey: "Package.name",
      },
      {
        id: "time_booking",
        header: () => <p className="text-sm dark:text-neutral-200">Waktu</p>,
        accessorKey: "time_booking",
        cell: ({ getValue }) => {
          const time_booking = getValue();

          return (
            <span className={`capitalize font-medium`}>
              {formatWaktu(time_booking)}
            </span>
          );
        },
      },
      {
        id: "status",
        header: () => <p style={{ fontSize: 14, color: "#333" }}>Status</p>,
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();

          // Label status sesuai permintaan
          const statusLabels = {
            AWAITING: "Menunggu Kedatangan",
            "ON-PROCESS": "Sedang Dikerjakan",
            CANCEL: "Dibatalkan",
            DONE: "Selesai",
            OPEN: "Menunggu Konfirmasi",
          };

          // Warna status (mirip Tailwind)
          const statusColors = {
            CANCEL: { color: "#DC2626" }, // merah
            AWAITING: { color: "#CA8A04" }, // kuning
            "ON-PROCESS": { color: "#2563EB" }, // biru
            DONE: { color: "#16A34A" }, // hijau
            OPEN: { color: "#2563EB" }, // biru (sama dengan on-process)
          };

          const style = {
            ...(statusColors[status.toUpperCase()] || { color: "#000000" }),
            fontWeight: "600",
            textTransform: "capitalize",
          };

          return (
            <span style={style}>
              {statusLabels[status.toUpperCase()] || status}
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
    ],
    []
  );

  if (isLoading) {
    return <Loading />;
  }
  console.log(dataRiwayat?.data);

  return (
    <>
      <TableContainer datas={dataRiwayat?.data} columns={columns} />
      <ViewRiwayat
        open={openModal}
        setOpen={setOpenModal}
        dataDetail={detailData}
      />
    </>
  );
};

export default RiwayatPage;
