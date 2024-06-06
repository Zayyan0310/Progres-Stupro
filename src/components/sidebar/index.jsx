import { Input, Button, WelcomeAuth, Modal } from "@/components";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Beranda");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col z-40 justify-between h-screen md:w-[20%] w-[100%] p-2 bg-gradient-to-br from-sky-400 via-cyan-600 to-sky-950">
      <img className="" src="/img_login.svg" alt="Login" />
      <div className="relative flex flex-col gap-[10px] pb-20 items-center">
        <NavLink to="/beranda" className={`flex flex-row gap-6 items-center justify-center py-2 w-[90%] rounded-[15px] ${activeItem === "Beranda" ? "bg-sky-400" : ""}`} onClick={() => setActiveItem("Beranda")}>
          <img className="w-6 h-6" src="/icon_beranda.svg" alt="Beranda" />
          <div className="text-white text-xl font-medium font-['Poppins'] min-w-[40%]">Beranda</div>
        </NavLink>
        <NavLink to="/catatan" className={`flex flex-row gap-6 items-center justify-center py-2 w-[90%] rounded-[15px] ${activeItem === "Catatan" ? "bg-sky-400" : ""}`} onClick={() => setActiveItem("Catatan")}>
          <img className="w-6 h-6" src="/icon_catatan.svg" alt="Catatan" />
          <div className="text-white text-xl font-medium font-['Poppins'] min-w-[40%]">Catatan</div>
        </NavLink>
        <NavLink to="/kalender" className={`flex flex-row gap-6 items-center justify-center py-2 w-[90%] rounded-[15px] ${activeItem === "Kalender" ? "bg-sky-400" : ""}`} onClick={() => setActiveItem("Kalender")}>
          <img className="w-6 h-6" src="/icon_calendar.svg" alt="Kalender" />
          <div className="text-white text-xl font-medium font-['Poppins'] min-w-[40%]">Kalender</div>
        </NavLink>
      </div>
      <div className="relative flex flex-col gap-[10px] pb-6 items-center">
        <button onClick={() => setIsModalOpen(true)} className={`flex flex-row gap-6 items-center justify-center py-2 w-[90%]`}>
          <img className="w-6 h-6" src="/icon_logout.svg" alt="Keluar" />
          <div className="text-white text-xl font-medium font-['Poppins'] min-w-[40%]">Keluar</div>
        </button>
      </div>

      <Modal
        title="Konfirmasi Logout"
        open={isModalOpen}
        addButton={
          <>
            <button
              onClick={handleLogout} // Logout saat tombol "Ya" pada modal diklik
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Ya
            </button>
            <button
              onClick={() => setIsModalOpen(false)} // Menutup modal saat tombol "Tidak" pada modal diklik
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 ml-4"
            >
              Tidak
            </button>
          </>
        }
      />
    </div>
  );
};

export { Sidebar };
