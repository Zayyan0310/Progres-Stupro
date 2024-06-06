import PropTypes from "prop-types";

const CardPrioritas = ({ title, date, prioritas }) => {
  return (
    <div className="flex flex-col justify-evenly h-fit py-4 items-center gap-[15px] min-w-full md:min-w-[35%] w-full bg-sky-400/40 rounded-[20px] border-4 border-sky-400/20">
      <div className="text-center text-black text-lg font-bold font-['Poppins'] w-full max-w-full break-words whitespace-normal clamp-3-lines">{title}</div>
      <div className="text-black text-[15px] font-medium font-['Poppins'] leading-normal flex flex-row">
        <img src="/calendar_black.svg" />
        {date}
      </div>
      <div className={`${getPriorityColor(prioritas)} rounded-[5px] px-3 py-1 justify-center items-center gap-2.5 inline-flex`}>
        <div className="text-center text-stone-50 text-[10px] font-bold font-['Poppins'] leading-normal">{prioritas}</div>
      </div>
    </div>
  );
};

function getPriorityColor(prioritas) {
  switch (prioritas) {
    case "Tinggi":
      return "bg-red-400";
    case "Sedang":
      return "bg-green-400";
    case "Rendah":
      return "bg-amber-400";
    default:
      return "bg-gray-400";
  }
}

CardPrioritas.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  prioritas: PropTypes.string,
};

export default CardPrioritas;
