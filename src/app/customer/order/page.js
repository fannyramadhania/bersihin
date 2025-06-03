"use client";
import BookingCard from "@/pages/cleaner/booking/BookingCard";
import { useQuery } from "@tanstack/react-query";

export default function Order() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getPackage"],
    queryFn: async () => {
      const res = await fetch("/api/package");
      return res.json();
    },
  });

  const {
    data: dataTipeBangunan,
    isLoading: isLoadingTipeBangunan,
    error: errorTipeBangunan,
  } = useQuery({
    queryKey: ["getTipeBangunan"],
    queryFn: async () => {
      const res = await fetch("/api/tipe-bangunan");
      return res.json();
    },
  });

  const {
    data: dataLantaiBangunan,
    isLoading: isLoadingLantaiBangunan,
    error: errorLantaiBangunan,
  } = useQuery({
    queryKey: ["getLantaiBangunan"],
    queryFn: async () => {
      const res = await fetch("/api/lantai-bangunan");
      return res.json();
    },
  });


  
  if (isLoading || isLoadingTipeBangunan || isLoadingLantaiBangunan)
    return <p>Loading...</p>;
  if (error || errorTipeBangunan || errorLantaiBangunan)
    return <p>Error loading data</p>;

  const optionPackage = data?.data?.map((item) => ({
    label: item.name,
    value: item.id,
    price: item.price,
    tambah: item.tambah,
  }));

  const optionTipeBangunan = dataTipeBangunan?.data?.map((item) => ({
    label: item.name,
    value: item.id,
 
  }));

  const optionLantaiBangunan = dataLantaiBangunan?.data?.map((item) => ({
    label: item.name,
    value: item.id,
    price: item.price,
  }));

  return (
    <BookingCard
      optionPackage={optionPackage}
      optionTipeBangunan={optionTipeBangunan}
      optionLantaiBangunan={optionLantaiBangunan}
    />
  );
}
