import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const getItems = (panelStyle) => [
  {
    key: "1",
    label: <p className="text-base">Bagaimana cara memesan layanan?</p>,
    children: (
      <p className="text-base">
        Untuk memesan layanan, Anda perlu melakukan registrasi terlebih dahulu
        melalui website. Setelah terdaftar, Anda dapat menjadwalkan kunjungan
        dengan mengisi form order. Selanjutnya, Anda hanya perlu menunggu
        konfirmasi dari tim cleaner kami.
      </p>
    ),
  },
  {
    key: "2",
    label: <p className="text-base">Bagaimana pembayaran dilakukan?</p>,
    children: (
      <p className="text-base">
        Saat ini, pembayaran hanya tersedia setelah pekerjaan selesai, baik
        melalui transfer maupun tunai.
      </p>
    ),
  },
  {
    key: "3",
    label: (
      <p className="text-base">
        Bagaimana jika saya ingin membatalkan pesanan?
      </p>
    ),
    children: (
      <p className="text-base">
        Jika Anda ingin membatalkan pesanan, silakan hubungi tim customer
        service kami melalui WhatsApp. Kami akan membantu proses pembatalan
        sesuai dengan kebijakan yang berlaku.
      </p>
    ),
  },
  {
    key: "4",
    label: (
      <p className="text-base">Apa peralatan disediakan oleh tim cleaner?</p>
    ),
    children: (
      <p className="text-base">
        Tim cleaner kami menyediakan peralatan pembersih standar seperti sapu,
        pel, dan vacuum cleaner. Namun, peralatan khusus seperti setrika atau
        alat penggosok pakaian tidak termasuk dalam layanan.
      </p>
    ),
  },
  {
    key: "5",
    label: (
      <p className="text-base">Apakah bisa memesan untuk hari yang sama?</p>
    ),
    children: (
      <p className="text-base">
        Kami berusaha untuk memenuhi permintaan layanan pada hari yang sama,
        namun hal ini tergantung pada ketersediaan tim cleaner. Sebaiknya
        lakukan pemesanan minimal 1 hari sebelumnya untuk memastikan
        ketersediaan.
      </p>
    ),
  },
];
  
const FaqComponent = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
    return (
      <div className="w-3/4 mx-auto my-10">
        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </div>
    );
};
export default FaqComponent;
