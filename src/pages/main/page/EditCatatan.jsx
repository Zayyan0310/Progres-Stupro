import { Modal } from "@/components";
import { useState, useEffect } from "react";
import { InputCatatan, SelectOption } from "@/components";
import { HeaderCatatan } from "@/components/header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useNotes from "../../../hooks/useNotes";
import { getProfile } from "../../../services/userService";

function EditCatatan() {
  const [profile, setProfile] = useState([]);
  const location = useLocation();
  const { id, title, dateOrg, detail, prioritas, status } = location.state || {};
  const navigate = useNavigate();
  const { updateNote, error, loading } = useNotes();
  const [titleEdit, setTitle] = useState(title);
  const [description, setDescription] = useState(detail);
  const formattedDate = formatDate(dateOrg);
  const [date, setDate] = useState(formattedDate);
  const [statusEdit, setStatus] = useState(status);
  const [priority, setPriority] = useState(prioritas);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getProfile();
        setProfile(fetchedData.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  // Function to format date for input (optional, reusable)
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-pad month
    const day = String(date.getDate()).padStart(2, "0"); // Zero-pad day

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async () => {
    if (!title || !description || !date || !status || !priority) {
      setMessage("Masukkan data catatan dengan lengkap");
      setOpenMessage(true);
      return;
    }

    try {
      await updateNote(id, titleEdit, description, date, statusEdit, priority);
      setMessage("Catatan berhasil diubah");
      setOpenMessage(true);

      setTimeout(() => {
        navigate("/catatan");
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Gagal, Periksa kembali input Anda");
      setOpenMessage(true);
    }
  };

  return (
    <div className="md:p-2 p-2 max-w-5xl w-full">
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
      <div className="flex flex-col-reverse md:flex-row justify-end items-start md:gap-0 gap-4">
        <Link to="/profile" className="flex md:flex-row flex-row-reverse items-center gap-4">
          <div className="text-black text-base font-medium font-['Poppins']">{profile.name}</div>
          <img className="w-10 h-10 rounded-full" src={`http://localhost:3000${profile.image}`} />
        </Link>
      </div>
      <HeaderCatatan title="Ubah Catatanmu Disini" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col gap-12">
          <div className="flex items-center">
            <div className="max-w-[30%] w-full text-black text-md flex-none font-bold font-['Poppins']">Judul Catatan</div>
            <InputCatatan value={titleEdit} onChange={(e) => setTitle(e.target.value)} type="text" classname="w-full ml-4" />
          </div>
          <div className="flex items-center">
            <div className="max-w-[30%] w-full text-black text-md flex-none font-bold font-['Poppins']">Deskripsi Catatan</div>
            <InputCatatan value={description} onChange={(e) => setDescription(e.target.value)} type="textarea" classname="w-full ml-4" />
          </div>
          <div className="flex items-center">
            <div className="max-w-[30%] w-full text-black text-md flex-none font-bold font-['Poppins']">Tanggal</div>
            {/* <InputCatatan data="24/12/2024" classname="w-full ml-4" /> */}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full ml-4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex flex-col gap-12 mt-6 md:mt-0">
          <div className="flex items-center">
            <div className="max-w-[30%] w-full text-black text-md flex-none font-bold font-['Poppins']">Status</div>
            <SelectOption
              value={statusEdit}
              onChange={(value) => setStatus(value)}
              options={[
                { value: "Sedang Berjalan", label: "Sedang Berjalan" },
                { value: "Belum Mulai", label: "Belum Mulai" },
                { value: "Selesai", label: "Selesai" },
              ]}
              classname="w-full ml-4"
            />
          </div>
          <div className="flex items-center">
            <div className="max-w-[30%] w-full text-black text-md flex-none font-bold font-['Poppins']">Prioritas</div>
            <SelectOption
              value={priority}
              onChange={(value) => setPriority(value)}
              options={[
                { value: "Tinggi", label: "Tinggi" },
                { value: "Sedang", label: "Sedang" },
                { value: "Rendah", label: "Rendah" },
              ]}
              classname="w-full ml-4"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
        <div className="flex flex-col gap-12"></div>
        <div className="flex flex-row gap-6 md:gap-12 mt-6 md:mt-0">
          <button type="button" className="inline-flex w-full justify-center rounded-[12px] bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow-sm" onClick={() => navigate(-1)}>
            Batal
          </button>
          <button type="button" className="inline-flex w-full justify-center rounded-[12px] bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow-sm" onClick={handleSubmit} data-autofocus>
            Buat Catatan
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCatatan;
