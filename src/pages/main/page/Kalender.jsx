import { CalendarEvents } from "@/components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "../../../services/userService";

function Kalendar() {
  const [profile, setProfile] = useState([]);

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

  return (
    <div className=" md:p-2 p-2 max-w-5xl w-full">
      <div className="flex flex-col-reverse md:flex-row justify-end items-start md:gap-0 gap-4">
        <Link to="/profile" className="flex md:flex-row flex-row-reverse items-center gap-4">
          <div className="text-black text-base font-medium font-['Poppins']">{profile.name}</div>
          <img className="w-10 h-10 rounded-full" src={`http://localhost:3000${profile.image}`} />
        </Link>
      </div>
      <div className="flex flex-col-reverse md:flex-row min-h-0 gap-[5%] mt-8">
        <CalendarEvents />
      </div>
    </div>
  );
}

export default Kalendar;
