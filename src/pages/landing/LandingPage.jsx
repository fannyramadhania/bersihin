"use client";

import {
  AuditOutlined,
  BuildFilled,
  CheckCircleOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  CoffeeOutlined,
  EnvironmentFilled,
  EyeOutlined,
  HomeFilled,
  HomeOutlined,
  LikeOutlined,
  MailFilled,
  MailOutlined,
  PhoneFilled,
  MenuOutlined,
  CloseOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Logo from "@/assets/img/logobener.png";
import { Button, Carousel, Steps } from "antd";
import HomePageImg from "@/assets/img/homepage.jpg";
import Image from "next/image";
import HomePageImg2 from "@/assets/img/homepage2.webp";
import { useEffect, useRef, useState } from "react";
import LandingPhoto from "@/assets/img/landng3.png";
import { useRouter } from "next/navigation";
import LandingPhotoSlider from "@/assets/img/landing2.jpeg";
import FaqComponent from "@/components/FAQ.";
const LandingPageCard = ({ role, isAuthorize }) => {
  const router = useRouter();
  const aboutRef = useRef();
  const packageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (ref, label) => {
    scrollToSection(ref, label);
    setIsOpen(false); // Tutup menu setelah klik link
  };
  const jobDeskRef = useRef();
  const contactRef = useRef();
  const faqRef = useRef();
  const [activeSection, setActiveSection] = useState("");
  const menuItems = [
    { label: "Tentang", ref: aboutRef },
    { label: "Spesialis", ref: jobDeskRef },
    { label: "Paket", ref: packageRef },
    { label: "FAQ", ref: faqRef },
  ];

  const needData = [
    {
      key: 1,
      title: "Mengepel Lantai",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Lantai kinclong bebas debu dan lengket! Kami pastikan setiap sudut ruangan terasa segar dan bersih maksimal.",
    },
    {
      key: 2,
      title: "Menyapu Ruangan",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Tak ada lagi debu berserakan. Kami sapu bersih ruangan agar nyaman ditempati setiap saat.",
    },
    {
      key: 3,
      title: "Mengelap Furniture",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Dari meja hingga lemari, kami lap dengan teliti hingga semua permukaan tampak berkilau dan bebas noda.",
    },
    {
      key: 4,
      title: "Mencuci Piring",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Tinggalkan piring kotor pada kami! Semua peralatan makan akan kembali bersih, higienis, dan siap digunakan.",
    },
    {
      key: 5,
      title: "Menyikat Kamar Mandi",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Kamar mandi bersih adalah kunci kenyamanan. Kami sikat setiap sudut hingga bebas kerak dan bau tak sedap.",
    },
    {
      key: 6,
      title: "Menyikat WC",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Kami pastikan WC Anda bersih, higienis, dan bebas kuman dengan proses pembersihan menyeluruh.",
    },
    {
      key: 7,
      title: "Membersihkan Kulkas",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Kulkas bersih, makanan pun lebih aman. Kami bantu bersihkan bagian luar dan dalam kulkas dengan teliti.",
    },
    {
      key: 8,
      title: "Menggosok Pakaian",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Pakaian kusut? Tenang, kami gosok dengan rapi dan penuh perhatian agar siap pakai kapan saja.",
    },
    {
      key: 9,
      title: "Menyetrika Pakaian",
      icon: (
        <CoffeeOutlined
          className="mr-2"
          style={{ fontSize: "20px", color: "#105e36" }}
        />
      ),
      description:
        "Setrika rapi, tampilan percaya diri. Kami bantu setrika pakaian Anda agar terlihat selalu siap dan profesional.",
    },
  ];

  const rewardData = [
    {
      key: 1,
      title: "Cleaner Profesional",
      icon: (
        <ClearOutlined
          className="mr-2"
          style={{ fontSize: "40px", color: "#FFFFFF" }}
        />
      ),
      total: "150+",
    },
    {
      key: 2,
      title: "Pelanggan Puas",
      icon: (
        <SmileOutlined
          className="mr-2"
          style={{ fontSize: "40px", color: "#FFFFFF" }}
        />
      ),
      total: "1200+",
    },
    {
      key: 3,
      title: "Penghargaan Terima",
      icon: (
        <AuditOutlined
          className="mr-2"
          style={{ fontSize: "40px", color: "#FFFFFF" }}
        />
      ),
      total: "10+",
    },
    {
      key: 4,
      title: "Proyek Selesai",
      icon: (
        <LikeOutlined
          className="mr-2"
          style={{ fontSize: "40px", color: "#FFFFFF" }}
        />
      ),
      total: "800+",
    },
  ];

const packagePriceList = [
  {
    key: 1,
    title: "Bersih Berseri",
    price: "Rp.89.000",
    img: (
      <Image
        width={50}
        height={50}
        src="https://img.icons8.com/ios/50/housekeeper-female.png"
        alt="housekeeper-female"
      />
    ),
    description: "Lorem ipsum dolor sit amet.",
    isInclude1: true,
    isInclude2: true,
    isInclude3: true,
    isInclude4: true,
    isInclude5: false,
    isInclude6: false,
    isInclude7: false,
    isInclude8: false,
    isInclude9: false,
  },
  {
    key: 2,
    title: "Poles Permai",
    price: "Rp.170.000",
    img: (
      <Image
        width={100}
        height={100}
        src="https://img.icons8.com/ios/100/broom-with-a-lot-of-dust.png"
        alt="broom-with-a-lot-of-dust"
      />
    ),
    description: "Lorem ipsum dolor sit amet.",
    isInclude1: true,
    isInclude2: true,
    isInclude3: true,
    isInclude4: true,
    isInclude5: true,
    isInclude6: true,
    isInclude7: true,
    isInclude8: false,
    isInclude9: false,
  },
  {
    key: 3,
    title: "Sultan Bersih",
    price: "Rp.230.000",
    img: (
      <Image
        width={100}
        height={100}
        src="https://img.icons8.com/ios/100/washing-dishes.png"
        alt="washing-dishes"
      />
    ),
    description: "Lorem ipsum dolor sit amet.",
    isInclude1: true,
    isInclude2: true,
    isInclude3: true,
    isInclude4: true,
    isInclude5: true,
    isInclude6: true,
    isInclude7: true,
    isInclude8: true,
    isInclude9: true,
  },
];


  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const scrollToSection = (ref, sectionName) => {
    const offset = 80; // sesuaikan dengan tinggi navbar jika fixed
    const elementPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveSection(sectionName);
  };

  const direct = () => {

    if (isAuthorize) {
      if (role == "customer") {
        router.push("/customer/order");
      } else {
        router.push("/cleaner");
      }
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="text-gray-700 ">
      <div className="sticky top-0 bg-[#69b646] hidden md:flex justify-between ">
        <div className="flex gap-x-4 p-4">
          <div className="text-white flex items-center gap-x-4 mr-6 ">
            <EnvironmentFilled
              className="text-white"
              style={{ fontSize: "20px" }}
            />
            <div className="text-sm  ">
              <p>Jakarta , Indonesia</p>
            </div>
          </div>
          <div className="text-white flex items-center gap-x-4 ">
            <MailFilled className="text-white" style={{ fontSize: "20px" }} />
            <div className="text-sm">
              <p>infobersihin@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="w-26"></div>
        <div className="flex gap-x-4 p-4">
          <div className="text-white flex items-center gap-x-4 mr-6 ">
            <PhoneFilled className="text-white" style={{ fontSize: "20px" }} />
            <div className="text-sm">
              <p>(+62) 812 345 54</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 bg-white shadow-md  z-50">
        <div className="flex items-center justify-between h-20 mx-4 py-2">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="logo"
              width={120}
              height={80}
              className="mr-4"
            />
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center">
            {menuItems.map((item) => (
              <p
                key={item.label}
                onClick={() => scrollToSection(item.ref, item.label)}
                className={`mr-10 cursor-pointer font-bold transition-all duration-200 ease-in-out hover:text-green-500 ${
                  activeSection === item.label ? "text-green-600" : ""
                }`}
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* Hamburger icon mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? (
                <CloseOutlined style={{ fontSize: "24px" }} />
              ) : (
                <MenuOutlined style={{ fontSize: "24px" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            {menuItems.map((item) => (
              <p
                key={item.label}
                onClick={() => handleClick(item.ref, item.label)}
                className={`cursor-pointer font-bold px-6 py-3 border-b border-gray-200 hover:text-green-500 ${
                  activeSection === item.label ? "text-green-600" : ""
                }`}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex md:justify-between justify-center items-center">
        <div className="w-full bg-gradient-to-l from-[#e8e6e7] to-gray-50 h-[500px] flex items-center justify-center">
          <div className="text-center md:text-start">
            <h1 className="text-5xl font-bold font-sans text-[#32a0db] mt-10">
              <span className="text-sm">Cepat & Bisa Diandalkan</span> <br />
              Bersihin
              <br />
              Maksimal
              <br />
              Dijamin Kinclong!
            </h1>

            <button
              className="bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded-full mt-10 hover:bg-[#32a0db] transition duration-300 ease-in-out"
              onClick={() => direct()}
            >
              Pesan Sekarang
            </button>
          </div>
        </div>

        <Image
          src={HomePageImg}
          alt="homepage"
          width={1920}
          height={500}
          className="hidden md:block h-[500px] w-full object-cover"
        />
      </div>

      <div className="m-6 mt-20 md:flex justify-center mb-20" ref={aboutRef}>
        <div className="md:w-96">
          <p className="md:text-4xl text-2xl font-bold  font-sans text-[#32a0db]">
            Tentang Kami
          </p>
          <p className=" mt-4 ">
            Bersih.in siap bantu bersihin rumah kamu biar tetap segar dan bebas
            debu. Tim kami udah berpengalaman dan bisa diandalkan buat hasil
            yang maksimal!
          </p>
        </div>
        <div className="bg-blue-300 my-10 md:my-0 md:w-96 w-64 self-center m-auto block md:inline md:m-4 rounded-full border-6 border-[#69b646] mr-10 ">
          <Image
            src={HomePageImg2}
            alt="homepage"
            width={384} // default untuk md:w-96
            className="w-64 md:w-96"
          />
        </div>
        <div className=" self-end">
          <p className="md:text-4xl text-2xl font-bold  font-sans text-[#32a0db]">
            Kenapa harus Bersih.in ?
          </p>
          <ul className="list-disc ml-5 mt-4  text-gray-700 space-y-2">
            <li>Hemat waktu, kamu tinggal duduk manis aja</li>
            <li>Hasil bersih maksimal tanpa ribet</li>
            <li>Tim ramah dan profesional</li>
            <li>Bisa pilih jadwal sesuai kebutuhan kamu</li>
            <li>Harga terjangkau, kualitas oke</li>
          </ul>
        </div>
      </div>
      <div
        className="hidden md:block w-full h-96 bg-[#32a0db] mt-4 relative"
        ref={jobDeskRef}
      >
        {/* Tempatkan kotak yang menimpa di sini */}
        <div className="absolute inset-x-0 -bottom-50 ">
          <div className="flex justify-center">
            {" "}
            <div className="bg-gray-100 shadow-lg p-6  rounded">
              <p className="text-2xl font-bold font-sans text-[#32a0db] text-center ">
                Kami Ahlinya Bersih-Bersih !
              </p>
              <div className="flex justify-evenly w-[1300px] flex-wrap items-center mt-4">
                {needData.map((item) => {
                  return (
                    <div
                      className="bg-white p-4 rounded mt-4 w-96"
                      key={item.key}
                    >
                      <div className="flex items-start">
                        <LikeOutlined
                          className="mr-2"
                          style={{ fontSize: "20px", color: "#105e36" }}
                        />
                        <div className="">
                          <p className="font-bold font-sans text-gray-600">
                            {item.title}
                          </p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-full h-96 bg-[#69b646]">
        {/* Tempatkan kotak yang menimpa di sini */}
      </div>
      <div className="bg-gray-100 md:hidden shadow-lg p-6 rounded w-full ">
        <p className="text-2xl font-bold font-sans text-[#32a0db] text-center">
          Kami Ahlinya Bersih-Bersih!
        </p>
        <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
          {needData.map((item) => (
            <div
              className="bg-white p-4 rounded w-full sm:w-[300px] md:w-96"
              key={item.key}
            >
              <div className="flex items-start">
                <LikeOutlined
                  className="mr-2"
                  style={{ fontSize: "20px", color: "#105e36" }}
                />
                <div>
                  <p className="font-bold font-sans text-[#32a0db]">
                    {item.title}
                  </p>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:flex justify-center items-center mt-10">
        <div className="p-6">
          <p className="md:text-4xl text-2xl font-bold  font-sans text-[#32a0db]">
            Jasa Bersih-Bersih Rumah <br />
            yang Bisa Kamu Andalkan
          </p>
          <div>
            <div className="flex justify-between mt-10">
              <Steps
                progressDot
                className="mr-10"
                current={2} // Tidak perlu urutan proses, jadi bisa diset ke 0
                direction="vertical"
                items={[
                  {
                    title: "Tidur Lebih Nyenyak",
                    description:
                      "Kamar bersih bikin tidur makin nyaman dan rileks.",
                  },
                  {
                    title: "Sambut Tamu Tanpa Panik",
                    description:
                      "Ruang tamu selalu siap buat kedatangan siapa aja.",
                  },
                  {
                    title: "Masak Jadi Lebih Asyik",
                    description: "Dapur bersih bikin semangat masak tiap hari.",
                  },
                ]}
              />
              <Steps
                progressDot
                current={2}
                direction="vertical"
                items={[
                  {
                    title: "Mandi Makin Nyaman",
                    description: "Kamar mandi bersih, bebas licin dan wangi.",
                  },
                  {
                    title: "Bebas Debu, Bebas Alergi",
                    description:
                      "Perabot bersih bikin udara di rumah lebih sehat.",
                  },
                  {
                    title: "Waktu Lebih Luang",
                    description:
                      "Nggak perlu capek bersih-bersih, tinggal santai aja~",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <Image
          src={LandingPhoto}
          alt="homepage"
          width={384} // w-96 = 384px
          className="hidden md:inline bg-blue-300 ml-[120px] border-[6px] border-[#69b646]"
        />
      </div>
      <div className="w-full mt-6 h-auto bg-[#69b646] text-white py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center items-center">
          {rewardData.map((item) => (
            <div key={item.key} className="text-center">
              {item.icon}
              <p className="text-2xl font-bold my-2">{item.total}</p>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={packageRef}>
        <div>
          <p className="md:text-4xl text-2xl font-bold  font-sans text-[#32a0db] mt-10 text-center">
            Spesial Pricing Package No Hiding Charge
          </p>
          <div className="flex justify-center items-center mt-10 ">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {packagePriceList.map((item) => {
                return (
                  <div
                    key={item.key}
                    className="bg-gray-100 p-10 rounded shadow-lg w-72"
                  >
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {item.title}
                    </h2>
                    <p className="text-center text-sm">Mulai dari</p>
                    <p className="text-3xl font-semibold mb-2 text-center text-green-600">
                      {item.price}
                    </p>

                    <div className="mb-2 flex items-center">
                      {item.isInclude1 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Mengepel lantai</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude2 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Menyapu ruangan</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude3 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Mengelap furniture</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude4 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Mencuci piring</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude5 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Menyikat kamar mandi</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude6 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Menyikat WC</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude7 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Membersihkan kulkas</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude8 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Menggosok pakaian</span>
                    </div>

                    <div className="mb-2 flex items-center">
                      {item.isInclude9 ? (
                        <CheckCircleOutlined style={{ color: "#1ECA6B" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "#B71414" }} />
                      )}
                      <span className="ml-2">Menyetrika pakaian</span>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button type="primary" onClick={() => direct()}>
                        Pesan
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div ref={faqRef}>
        <p className="md:text-4xl text-2xl font-bold mt-2  font-sans text-[#32a0db] mt-10 text-center">
          Temukan Jawabannya di Sini
        </p>
        <FaqComponent />
      </div>
      <footer
        ref={contactRef}
        style={{ backgroundColor: "#69b646", padding: "20px 0" }}
        className="mt-20 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white text-center md:text-start">
                Bersin.in
              </h3>
              <p className="text-white">Layanan Kebersihan Profesional</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <div className="mb-4 md:mb-0">
                <h4 className="font-semibold text-white mb-2">Kontak</h4>
                <p className="text-white">infobersihin@gmail.com</p>
                <p className="text-white">+1 (123) 456-7890</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Media</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/layanan_bersih.in"
                    target="_blank"
                    className="text-white hover:text-gray-900"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/6281234567890" // ganti dengan nomor kamu
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-900"
                  >
                    <span className="sr-only">WhatsApp</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.52 3.478a11.777 11.777 0 00-17.043 0 11.777 11.777 0 000 17.043l-.9 3.282 3.364-.882a11.777 11.777 0 0014.579-17.443zM12 21.109a9.101 9.101 0 01-4.619-1.252l-.331-.194-2.366.621.633-2.302-.214-.343a9.128 9.128 0 1115.135-2.437 9.123 9.123 0 01-8.238 5.907zm5.263-6.876c-.289-.145-1.709-.842-1.974-.938-.265-.098-.458-.145-.65.145s-.748.938-.917 1.13c-.17.194-.34.218-.63.073-.289-.145-1.221-.449-2.328-1.43-.86-.767-1.439-1.716-1.607-2.005-.17-.289-.018-.445.127-.589.131-.13.292-.34.438-.511.145-.17.194-.292.292-.486.098-.194.049-.364-.024-.511-.072-.145-.65-1.573-.891-2.154-.235-.566-.474-.49-.65-.5l-.555-.01c-.194 0-.511.073-.778.364s-1.024 1-1.024 2.438 1.049 2.833 1.194 3.026c.145.194 2.064 3.152 5.001 4.419.7.3 1.245.478 1.67.613.7.223 1.336.192 1.84.117.561-.084 1.709-.7 1.95-1.376.241-.675.241-1.253.169-1.376-.072-.123-.265-.194-.555-.34z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-6 pt-6 text-center text-white">
            <p>© {new Date().getFullYear()} Bersih.in All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageCard;
