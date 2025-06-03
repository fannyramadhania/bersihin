const { Modal } = require("antd");

const ViewRiwayat = ({ dataDetail, setOpen, open }) => {
  return (
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
    >
      <div className="space-y-4 p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Detail Pemesanan
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Nama</p>
            <p>{dataDetail?.nama || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Nomor HP</p>
            <p>{dataDetail?.phone || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Alamat</p>
            <p>{dataDetail?.address || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Booking</p>
            <p>{dataDetail?.time_booking || "-"}</p>
          </div>

          <div>
            <p className="font-medium">Waktu</p>
            <p>{dataDetail?.waktu || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Durasi</p>
            <p>{dataDetail?.durasi ? `${dataDetail.durasi} jam` : "-"}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>{dataDetail?.status || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Total Harga</p>
            <p>
              {dataDetail?.price_total
                ? `Rp${dataDetail.price_total.toLocaleString()}`
                : "-"}
            </p>
          </div>
          <div>
            <p className="font-medium">Paket</p>
            <p>{dataDetail?.Package?.name || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Harga Paket</p>
            <p>
              {dataDetail?.Package?.price
                ? `Rp${dataDetail.Package.price.toLocaleString()}`
                : "-"}
            </p>
          </div>
          <div>
            <p className="font-medium">Catatan</p>
            <p>{dataDetail?.catatan || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Cleaner</p>
            <p>{dataDetail?.Cleaners?.name || "-"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRiwayat;
