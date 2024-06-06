import PropTypes from "prop-types";
import { useState } from "react";

const Input = ({ name, type, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="relative h-11 w-full mt-3 min-w-[200px]">
        <input
          placeholder={name}
          type={showPassword ? "text" : type}
          value={value} // Menyertakan nilai input dari prop value
          onChange={onChange} // Menyertakan fungsi onChange dari prop onChange
          className="peer h-full w-full border-b border-[#5A5C5A] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <img src="/eye.svg" alt="Hide Password" className="w-4 h-4" /> : <img src="/eye_off.svg" alt="Show Password" className="w-4 h-4" />}
          </div>
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const InputProfile = ({ isEditing, value, onChange }) => {
  return (
    <div className="bg-white rounded-[10px] shadow px-4 py-2">
      <input type="text" value={value} onChange={onChange} disabled={!isEditing} className={`text-black text-[15px] font-normal font-['Poppins'] bg-white outline-none w-full ${!isEditing ? "cursor-not-allowed" : ""}`} />
    </div>
  );
};

InputProfile.propTypes = {
  value: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const InputCatatan = ({ type, value, classname, name, onChange }) => {
  const inputClass = "text-black text-[15px] font-normal font-['Poppins'] bg-white outline-none w-full";
  const textareaClass = "text-black text-[15px] font-normal font-['Poppins'] bg-white outline-none w-full resize-none h-24 flex items-center justify-center";

  return (
    <div className={`bg-white rounded-[10px] shadow px-4 py-2 ${classname} flex items-center justify-center`}>
      {type === "textarea" ? (
        <textarea placeholder={name} value={value} onChange={onChange} rows={4} className={textareaClass} />
      ) : type === "date" ? (
        <input type="date" placeholder={name} value={value} onChange={onChange} className={inputClass} />
      ) : (
        <input type="text" placeholder={name} value={value} onChange={onChange} className={inputClass} />
      )}
    </div>
  );
};

export default InputCatatan;

InputCatatan.propTypes = {
  data: PropTypes.string,
  type: PropTypes.string,
  classname: PropTypes.string,
};

const SelectOption = ({ options, value, onChange, classname }) => {
  const selectedValue = value === "" && options.length > 0 ? options[0].value : value;

  let statusColor, priorityColor;

  switch (selectedValue) {
    case "Sedang Berjalan":
      statusColor = "bg-yellow-200 text-yellow-800";
      break;
    case "Belum Mulai":
      statusColor = "bg-gray-200 text-gray-800";
      break;
    case "Selesai":
      statusColor = "bg-green-200 text-green-800";
      break;
    default:
      statusColor = "bg-gray-200 text-gray-800";
      break;
  }

  switch (selectedValue) {
    case "Tinggi":
      priorityColor = "bg-red-400/30 text-red-800";
      break;
    case "Sedang":
      priorityColor = "bg-green-400/30 text-green-800";
      break;
    case "Rendah":
      priorityColor = "bg-amber-400/30 text-amber-800";
      break;
    default:
      priorityColor = "bg-gray-400/30 text-gray-400";
      break;
  }

  return (
    <div className={`relative ${classname}`}>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className={`block appearance-none w-full ${statusColor} ${priorityColor} border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

SelectOption.propTypes = {
  options: PropTypes.array,
  classname: PropTypes.string,
};

// eslint-disable-next-line no-unused-vars
const Search = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative w-fit">
      <input type="text" placeholder="Cari Catatan" className="w-64 h-12 px-4 py-2 rounded-[15px] border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400" value={searchTerm} onChange={handleSearchInputChange} />
      <div className="absolute top-0 right-0 flex items-center h-12 pr-4">
        <img src="/search.svg" alt="Search Icon" className="w-6 " />
      </div>
    </div>
  );
};

Search.propTypes = {
  data: PropTypes.string,
};

const Button = ({ name, onClick }) => {
  return (
    <>
      <div className="h-10 cursor-pointer bg-sky-700 rounded-[0.6rem] shadow justify-center items-center inline-flex w-full mt-6 min-w-[200px]" onClick={onClick}>
        <div className="text-center text-white text-base font-bold font-['Poppins']">{name}</div>
      </div>
    </>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export { Input, InputProfile, InputCatatan, Button, Search, SelectOption };
