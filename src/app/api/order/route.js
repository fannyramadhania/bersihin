import supabase from "@/lib/Database";

export async function POST(request) {
  const formData = await request.formData();

  // Ambil semua field dari FormData
  const name = formData.get("name");
  const phone = formData.get("telp"); // akan disimpan di kolom `phone`
  const bookingDate = formData.get("bookingDate"); // untuk kolom `time_booking`
  const catatan = formData.get("catatan");
  const jam = formData.get("jam"); // akan disimpan di kolom `durasi`
  const waktu = formData.get("waktu");
  const lantai = formData.get("lantai"); // untuk kolom `lantai_bangunan_id` (UUID)
  const tipe = formData.get("tipe"); // untuk kolom `tipe_bangunan_id` (UUID)
  const paket = formData.get("paket"); // untuk kolom `package_id` (UUID)
  const customer_id = formData.get("cus_id"); // untuk kolom `customer_id`
  const address = formData.get("address");
  const total = formData.get("total"); // untuk kolom `price_total`

  // Simpan ke database dengan Supabase
  const { data, error } = await supabase.from("Order").insert({
    nama: name,
    phone: phone,
    time_booking: bookingDate,
    address: address,
    status: "OPEN",
    catatan: catatan,
    waktu: waktu,
    durasi: jam ? parseInt(jam) : null,
    tipe_bangunan_id: tipe,
    lantai_bangunan_id: lantai,
    package_id: paket,
    customer_id: customer_id,
    price_total: total ? parseFloat(total) : 0,
  });

  console.log({
    nama: name,
    phone: phone,
    time_booking: bookingDate,
    address: address,
    status: "OPEN",
    catatan: catatan,
    waktu: waktu,
    durasi: jam ? parseInt(jam) : null,
    tipe_bangunan_id: tipe,
    lantai_bangunan_id: lantai,
    package_id: paket,
    customer_id: customer_id,
    price_total: total ? parseFloat(total) : 0,
  });

  if (error) {
    console.error("Supabase error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({
      status: 201,
      message: "Successfully created",
      data: data,
    }),
    {
      status: 201,
    }
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const idCustomer = searchParams.get("id"); // optional
  const status = searchParams.get("status"); // optional

  let query = supabase.from("Order").select(
    `
      *,
      Package (
        id,
        name,
        price
      ),
      Cleaners (
        cleaner_id,
        name,
        phone
      )
    `
  );

  if (idCustomer) {
    query = query.eq("customer_id", idCustomer);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({
      status: 200,
      data,
    }),
    {
      status: 200,
    }
  );
}


export async function PATCH(request) {
  const formData = await request.formData();

  const orderId = formData.get("id");
  const newStatus = formData.get("status");
  const cleanerId = formData.get("cleaner_id");
  const reasonCancel = formData.get("reason_cancel");

  if (!orderId || !newStatus) {
    return new Response(JSON.stringify({ error: "Missing ID or status" }), {
      status: 400,
    });
  }

  // Siapkan data yang akan diupdate
  const updateData = {
    status: newStatus,
  };

  // Tambahkan cleaner_id jika ada
  if (cleanerId) {
    updateData.cleaner_id = cleanerId;
  }

  // Jika status adalah "CANCEL" (string), tambahkan reason_cancel jika ada
  if (newStatus === "CANCEL" && reasonCancel) {
    updateData.reason_cancel = reasonCancel;
  }

  const { data, error } = await supabase
    .from("Order")
    .update(updateData)
    .eq("order_id", orderId);

  if (error) {
    console.error("Supabase update error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({
      status: 200,
      message: "Status updated successfully",
      data: data,
    }),
    {
      status: 200,
    }
  );
}

