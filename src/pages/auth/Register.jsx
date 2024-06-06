import { Input, Button, WelcomeAuth, Modal } from "@/components";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error, loading } = useAuth();
  const [message, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !name || !password || !confirmPassword) {
      setMessage("Semua bidang harus diisi");
      setOpenMessage(true);
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Format email tidak valid");
      setOpenMessage(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Kata sandi dan konfirmasi kata sandi tidak cocok");
      setOpenMessage(true);
      return;
    }

    try {
      await register(name, email, password);
      navigate("/login");
    } catch (err) {
      setMessage(err.message || "Gagal registrasi, periksa kembali detail Anda");
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
              <span className="font-outline-2">Daftar</span>
            </div>
            <div className="text-black text-base font-[600] font-['Poppins'] mt-6">Masukkan detail data anda</div>
            <Input name="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input name="Nama Pengguna" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <Input name="Kata Sandi" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input name="Konfirmasi Kata Sandi" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button name="Daftar" onClick={handleSubmit} />
          </div>
          <WelcomeAuth />
        </div>
        <div className="absolute inset-0 z-20 pointer-events-none"></div>
      </div>
    </>
  );
}

export default Register;
