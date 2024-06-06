import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllTips, getTipById } from "../../services/tipsService";

const TipsItem = ({ number, title, description }) => (
  <>
    <li className="font-bold">
      {number}. {title}
    </li>
    <p className="mb-4">{description}</p>
  </>
);

TipsItem.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

const Card = ({ id, title, image }) => {
  const navigate = useNavigate();

  const handleLinkClick = (event) => {
    navigate(`/tips/${id}`);
    window.location.reload();
  };

  return (
    <div className="w-full bg-white rounded-[25px] shadow flex-col justify-start items-start">
      <div className="self-stretch p-4 flex-col justify-start items-start gap-2.5 flex">
        <img className="self-stretch grow shrink basis-0 rounded-[25px]" src={`http://localhost:3000${image}`} />
      </div>
      <div className="self-stretch  px-4 flex-col justify-center items-start gap-2.5 flex">
        <div className="self-stretch text-sky-400 text-lg font-bold font-['Poppins'] tracking-tight">{title}</div>
      </div>
      <div className="px-4 pt-2 pb-4 flex-col justify-start items-start gap-2.5 flex">
        <Link to={`/tips/${id}`} className="px-4 py-2 bg-sky-400 rounded-xl justify-center items-center gap-2.5 inline-flex" onClick={handleLinkClick}>
          <div className="text-white text-base font-bold font-['Open Sans'] tracking-tight">Baca Selengkapnya</div>
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
};

export default function TipsTrik() {
  const navigate = useNavigate();

  // const tipsData = [
  //   { number: 1, title: "Membuat Daftar Tugas", description: "Tulis semua tugas yang perlu Anda selesaikan. Prioritaskan tugas berdasarkan urgensi dan pentingnya" },
  //   { number: 2, title: "Gunakan Kalender atau Aplikasi Manajemen Waktu", description: "Tentukan jadwal untuk setiap tugas dalam kalender atau aplikasi manajemen waktu. Tetapkan batas waktu yang realistis untuk setiap tugas" },
  //   {
  //     number: 3,
  //     title: "Gunakan Teknik Pomodoro",
  //     description: "Kerjakan tugas selama 25 menit, kemudian beristirahat selama 5 menit. Setelah empat sesi, beristirahat lebih lama (15-30 menit). Teknik ini dapat membantu Anda tetap fokus dan efisien.",
  //   },
  //   { number: 4, title: "Hindari Prokrastinasi", description: "Mulailah mengerjakan tugas segera setelah Anda menetapkannya. Jangan menunda-nunda pekerjaan yang bisa dilakukan hari ini." },
  //   { number: 5, title: "Atur Waktu Istirahat", description: "Selain bekerja, penting juga untuk memberikan waktu istirahat yang cukup. Istirahat yang cukup dapat membantu Anda tetap segar dan produktif saat bekerja." },
  //   { number: 6, title: "Evaluasi dan Sesuaikan", description: "Lakukan evaluasi rutin terhadap jadwal Anda. Sesuaikan jadwal jika diperlukan untuk mengatasi perubahan yang muncul." },
  // ];

  const { id } = useParams();
  const [tips, setTips] = useState([]);
  const [tipThis, setTipThis] = useState([]);
  const [arrayTip, setArrayTip] = useState([]);

  useEffect(() => {
    const fetchTipData = async () => {
      try {
        const fetchedTip = await getTipById(id);
        setTipThis(fetchedTip);
        setArrayTip(fetchedTip.data.content);
      } catch (error) {
        console.error("Error fetching tip:", error);
      }
    };

    fetchTipData();
  }, []);

  useEffect(() => {
    const fetchTipsData = async () => {
      try {
        const fetchedTips = await getAllTips();
        setTips(fetchedTips);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTipsData();
  }, []);

  const tipsData = arrayTip.map((arrTip, index) => ({
    number: index + 1,
    title: arrTip.title,
    description: arrTip.description,
  }));

  

  const halfLength = Math.ceil(tipsData.length / 2);
  const firstHalf = tipsData.slice(0, halfLength);
  const secondHalf = tipsData.slice(halfLength);

  return (
    <div className="w-full bg-[#f2f2f2] flex items-center justify-center">
      <div className="md:p-2 p-2 max-w-7xl bg-[#f2f2f2] w-full">
        <Link to={`/beranda`} className="flex flex-row cursor-pointer md:mt-4 mt-2 px-4 h-9 items-center w-fit">
          <img src="/back.svg" alt="back" className="h-4 mr-4" />
          <div className="text-black text-2xl font-bold font-['Poppins']">Kembali</div>
        </Link>
        <div className="flex flex-col md:flex-row min-h-0 gap-[2%] mt-2">
          <div className="flex flex-col md:w-[67%] h-full w-[100%] py-4 md:px-8 px-4 md:mb-0 mb-12 gap-[10px]">
            <img className="w-full h-72 rounded-[25px] shadow" src={`http://localhost:3000${tipThis.data && tipThis.data.image}`} alt="Placeholder" />
            <div className="text-center text-sky-400 text-[24px] font-bold font-['Poppins']">{tipThis.data && tipThis.data.title}</div>
            <div className="flex flex-row justify-between relative h-full mt-6">
              <div className="flex flex-col md:w-[45%]  w-[100%] h-full md:px-3 px-2 gap-3 justify-center items-center ">
                <ul>
                  {firstHalf.map((tip, index) => (
                    <TipsItem key={index + 1} {...tip} />
                  ))}
                </ul>
              </div>
              <div className="separator h-full shadow-lg w-[1px] rounded-[1px] bg-black absolute left-1/2 transform -translate-x-1/2"></div>
              <div className="flex flex-col md:w-[45%] w-[100%] h-full md:px-3 px-2 gap-3 justify-center items-center">
                <ul>
                  {secondHalf.map((tip, index) => (
                    <TipsItem key={index + 1} {...tip} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[30%] w-[100%] h-[90vh] md:px-3 px-2 gap-6 overflow-y-auto">
            {tips.data && tips.data.length > 0 && tips.data.map((tip, index) => <Card key={tip.id || index} id={tip.id} title={tip.title} image={tip.image} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
