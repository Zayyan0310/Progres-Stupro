/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Button, WelcomeAuth, Modal } from "@/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMessage, setOpenMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword, error, loading } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Masukan email anda");
      setOpenMessage(true);
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Format email tidak valid");
      setOpenMessage(true);
      return;
    }
    if (!newPassword) {
      setMessage("Masukan Password baru anda");
      setOpenMessage(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Kata sandi baru dan konfirmasi kata sandi baru harus sama.");
      setOpenMessage(true);
      return;
    }

    try {
      await resetPassword(email, newPassword, otp);
      setMessage("Password Berhasil direset");
      setOpenMessage(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Gagal reset, periksa kembali detail Anda");
      setOpenMessage(true);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#F2F2F2] relative">
        <Modal
          title={message}
          open={openMessage}
          addButton={
            <>
              <button type="button" className="inline-flex justify-center rounded-[12px] bg-sky-700 px-6 py-2 text-sm font-semibold text-white shadow-sm w-fit" onClick={() => setOpenMessage(false)}>
                Close
              </button>
            </>
          }
        />
        <div className="absolute w-full h-full">
          <div className="relative w-full h-full">
            <img src="/buble1.svg" className="h-[40%] absolute top-0 right-0" alt="buble 1" />
            <img src="/buble2.svg" className="h-[40%] absolute bottom-0 right-0" alt="buble 2" />
            <img src="/buble3.svg" className="h-[60%] absolute inset-0 m-auto left-1/4 transform -translate-x-2/3" alt="buble 3" />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:min-h-screen min-h-0">
          <div className="flex flex-col md:w-[40%] w-[100%] px-16 py-6 md:py-0 bg-[#F2F2F2] justify-center relative z-10">
            <div className="text-black text-4xl font-bold font-poppins">
              <span className="font-outline-2">Verifikasi OTP</span>
            </div>
            <div className="text-black text-base font-[600] font-['Poppins'] mt-6">Masukkan detail data anda</div>
            <Input name="Email Anda" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input name="Kode OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Input name="Kata Sandi Baru" type="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
            <Input name="Konfirmasi Kata Sandi Baru" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button name="Reset" onClick={handleSubmit} />
          </div>
          <WelcomeAuth />
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none"></div>
      </div>
    </>
  );
}

export default VerifyOTP;
