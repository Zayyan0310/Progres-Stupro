/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Button, WelcomeAuth, Modal } from "@/components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useAuth();
  const [message, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setMessage("Email dan Kata Sandi harus diisi");
      setOpenMessage(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Format email tidak valid");
      setOpenMessage(true);
      return;
    }

    try {
      await login(email, password);
      navigate("/beranda");
    } catch (err) {
      setMessage(err.message || "Gagal masuk, periksa kembali detail Anda");
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
        <div className="absolute w-full h-full z-0">
          <div className="relative w-full h-full">
            <img src="/buble1.svg" className="h-[40%] absolute top-0 right-0" alt="buble 1" />
            <img src="/buble2.svg" className="h-[40%] absolute bottom-0 right-0" alt="buble 2" />
            <img src="/buble3.svg" className="h-[60%] absolute inset-0 m-auto left-1/4 transform -translate-x-2/3" alt="buble 3" />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:min-h-screen min-h-0">
          <div className="flex flex-col md:w-[40%] w-[100%] px-16 py-6 md:py-0 bg-[#F2F2F2] justify-center relative z-10">
            <div className="text-black text-4xl font-bold font-poppins">
              <span className="font-outline-2">Masuk</span>
            </div>
            <div className="text-black text-base font-[600] font-['Poppins'] mt-6">Masukkan detail data anda</div>
            <Input name="Email Pengguna" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input name="Kata Sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link to="/reset-password" className="w-fit">
              <div className="text-sky-800 text-base font-[500] mt-4 font-['Poppins'] cursor-pointer">Lupa Kata Sandi?</div>
            </Link>
            <Button name="Masuk" onClick={handleSubmit} />

            <Link to="/register">
              <div className="text-sky-800 text-base font-[500] mt-12 font-['Poppins'] text-center">Belum punya akun? Daftar</div>
            </Link>
          </div>
          <WelcomeAuth />
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none"></div>
      </div>
    </>
  );
}

export default Login;
