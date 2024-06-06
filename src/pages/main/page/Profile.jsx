import { InputProfile, Button } from "@/components";
import { Modal } from "@/components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../services/userService";
import useUsers from "../../../hooks/useUsers";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setTelp] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const { updateProfile, error, loading } = useUsers();

  const handleSubmit = async () => {
    if (!newUsername || !email || !telp || !bio) {
      setMessage("Masukkan data profile dengan lengkap");
      setOpenMessage(true);
      return;
    }

    try {
      await updateProfile(email, newUsername, telp, bio, file);
      setMessage("Profile berhasil diubah");
      setOpenMessage(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Gagal, Periksa kembali input Anda");
      setOpenMessage(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getProfile();
        setProfile(fetchedData.data);
        setUsername(fetchedData.data.name);
        setEmail(fetchedData.data.email);
        setTelp(fetchedData.data.telp);
        setBio(fetchedData.data.bio);
        setImage(fetchedData.data.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-[25px] shadow md:p-8 p-2">
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
      <div className="flex flex-col-reverse md:flex-row min-h-0">
        <div className="flex flex-col md:w-[60%] w-[100%] py-4 px-8 gap-[25px]">
          <div>
            <div className="text-sky-400 text-[25px] font-bold font-['Poppins']">Nama Pengguna</div>
            <InputProfile value={newUsername} onChange={(e) => setUsername(e.target.value)} isEditing={isEditing} />
          </div>
          <div>
            <div className="text-sky-400 text-[25px] font-bold font-['Poppins']">Email</div>
            <InputProfile value={email} onChange={(e) => setEmail(e.target.value)} isEditing={isEditing} />
          </div>
          <div>
            <div className="text-sky-400 text-[25px] font-bold font-['Poppins']">No.Telp</div>
            <InputProfile value={telp} onChange={(e) => setTelp(e.target.value)} isEditing={isEditing} />
          </div>
          <div className="flex flex-col lg:flex-row gap-[10px] md:gap-[30px]">
            <div onClick={() => navigate(-1)}>
              <Button name="Kembali" />
            </div>
            <Button name={isEditing ? "Simpan" : "Ubah"} onClick={isEditing ? handleSubmit : handleEditClick} />
          </div>
        </div>
        <div className="flex flex-col md:w-[40%] w-[100%] md:p-8 p-8 gap-6 justify-center items-center">
          <img className="w-[70%] bg-black rounded-full object-cover" src={`http://localhost:3000${image}`} alt="Profile" />
          <input
            className={`${!isEditing ? "hidden" : "block"} w-[70%] block text-sm text-gray-900 border border-gray-300 rounded-lg file:px-1 file:right-0 file:py-2 cursor-pointer bg-gray-50 focus:outline-none file:border-none`}
            id="file_input"
            type="file"
            onChange={handleFileChange}
          />
          <textarea disabled={!isEditing} onChange={(e) => setBio(e.target.value)} className={`bg-white rounded-[10px] shadow py-8 px-2 w-[70%] ${!isEditing ? "hidden" : "block"}`} value={isEditing ? bio : `"${bio}"`} />

          <div className={`bg-white rounded-[10px] shadow py-8 px-2 ${!isEditing ? "cursor-not-allowed block" : "hidden"}`}>
            <div className={` text-center text-black text-[15px] font-bold font-['Poppins']`}>{`"${bio}"`}</div>
          </div>

          {/* <InputProfile data="." isEditing={isEditing} /> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
