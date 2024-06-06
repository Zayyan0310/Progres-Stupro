import { Modal, Search } from "@/components";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getAllNotes } from "../../../services/notesService";
import useNotes from "../../../hooks/useNotes";
import { getProfile } from "../../../services/userService";

function Catatan() {
  const [profile, setProfile] = useState([]);

  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const { deleteNote, error, loading } = useNotes();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    console.log(idDelete);

    try {
      await deleteNote(idDelete);
      setMessage("Catatan berhasil dihapus");
      setOpenMessage(true);
      setOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Gagal menghapus");
      setOpenMessage(true);
    }
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await getAllNotes("");
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotesWithSearch = async () => {
      try {
        const fetchedNotes = await getAllNotes(searchTerm);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotesWithSearch();
  }, [searchTerm]);

  //   console.log(notes);

  function getPriorityColor(prioritas) {
    switch (prioritas) {
      case "Tinggi":
        return "bg-red-400/30 text-red-400";
      case "Sedang":
        return "bg-green-400/30 text-green-400";
      case "Rendah":
        return "bg-amber-400/30 text-amber-400";
      default:
        return "bg-gray-400/30 text-gray-400";
    }
  }

  const Item = ({ id, title, date, dateOrg, detail, prioritas, status }) => {
    return (
      <div className="rounded-[20px] bg-white flex flex-col shadow py-3 px-6 relative">
        <div className="w-full flex justify-end items-end">
          <div className={`text-center px-4 py-1 ${getPriorityColor(prioritas)} rounded-[5px] w-fit text-[12px] font-bold font-['Poppins'] leading-normal`}>{prioritas}</div>
        </div>
        <div className=" text-black text-[15px] font-bold font-['Poppins'] leading-normal">{title}</div>
        <div className=" text-black text-[15px] font-normal font-['Poppins'] leading-normal">{detail}</div>
        <div className="flex flex-row mt-4 justify-between">
          <div className="flex flex-row">
            <img src="/calendar_black.svg" />
            {date}
          </div>
          <div className="flex flex-row gap-2">
            <Link to="/edit-catatan" state={{ id, title, dateOrg, detail, prioritas, status }}>
              <img className="w-4 h-4" src="/edit.svg" />
            </Link>
            <img
              className="w-4 h-4 cursor-pointer"
              src="/delete.svg"
              onClick={() => {
                setIdDelete(id);
                setOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  Item.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    detail: PropTypes.string,
    prioritas: PropTypes.string,
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id", options); // Gunakan lokalisasi 'id' untuk bahasa Indonesia
  }

  return (
    <div className=" md:p-2 p-2  max-w-5xl w-full">
      <Modal
        title="Yakin ingin menghapus catatan?"
        open={open}
        addButton={
          <>
            <button type="button" className="inline-flex justify-center rounded-[12px] bg-sky-700 px-6 py-2 text-sm font-semibold text-white shadow-sm w-fit" onClick={handleDelete}>
              Hapus
            </button>
            <button type="button" className="inline-flex justify-center rounded-[12px] bg-sky-700 px-6 py-2 text-sm font-semibold text-white shadow-sm w-fit" onClick={() => setOpen(false)} data-autofocus>
              Batal
            </button>
          </>
        }
      />
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
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:gap-0 gap-4">
        <Search onSearchChange={handleSearchChange} />
        <Link to="/profile" className="flex md:flex-row flex-row-reverse items-center gap-4">
          <div className="text-black text-base font-medium font-['Poppins']">{profile.name}</div>
          <img className="w-10 h-10 rounded-full" src={`http://localhost:3000${profile.image}`} />
        </Link>
      </div>

      <Link to="/buat-catatan" className="flex flex-row mt-6 items-center gap-3">
        <div className="text-sky-400 h-fit text-[25px] font-bold font-['Poppins'] leading-normal ">Buat Catatan</div>
        <img src="/plus.svg" className="cursor-pointer" />
      </Link>

      <div className="grid-cols-3 md:grid hidden  gap-4 mt-6">
        <div className="text-center">
          <span className="px-4 py-2 text-xl font-semibold mb-4">Belum Mulai</span>
        </div>
        <div className="text-center">
          <span className="px-4 py-2 text-xl font-semibold mb-4">Sedang Berjalan</span>
        </div>
        <div className="text-center">
          <span className="px-4 py-2 text-xl font-semibold mb-4">Selesai</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
        {/* belum mulai */}
        <div className="flex flex-col gap-4">
          <div className="text-center sm:hidden">
            <span className="px-4 py-2 text-xl font-semibold mb-4">Belum Mulai</span>
          </div>
          {notes.data &&
            notes.data.length > 0 &&
            notes.data
              .filter((note) => note.status === "Belum Mulai")
              .map((note, index) => <Item key={note.id || index} id={note.id} date={formatDate(note.date)} dateOrg={note.date} title={note.title} detail={note.description} prioritas={note.priority} status={note.status} />)}
        </div>

        {/* Sedang Berjalan */}
        <div className="flex flex-col gap-6">
          <div className="text-center sm:hidden">
            <span className="px-4 py-2 text-xl font-semibold mb-4">Sedang Berjalan</span>
          </div>
          {notes.data &&
            notes.data.length > 0 &&
            notes.data
              .filter((note) => note.status === "Sedang Berjalan")
              .map((note, index) => <Item key={note.id || index} id={note.id} date={formatDate(note.date)} dateOrg={note.date} title={note.title} detail={note.description} prioritas={note.priority} status={note.status} />)}
        </div>
        {/* Selesai */}
        <div className="flex flex-col gap-6">
          <div className="text-center sm:hidden">
            <span className="px-4 py-2 text-xl font-semibold mb-4">Selesai</span>
          </div>
          {notes.data &&
            notes.data.length > 0 &&
            notes.data
              .filter((note) => note.status === "Selesai")
              .map((note, index) => <Item key={note.id || index} id={note.id} date={formatDate(note.date)} dateOrg={note.date} title={note.title} detail={note.description} prioritas={note.priority} status={note.status} />)}
        </div>
      </div>
    </div>
  );
}

export default Catatan;
