import { useState, useEffect } from "react";
import { getAllNotes } from "../../services/notesService";

const Calendar = () => {
  const generateCalendarDates = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];

    // Calculate days to show from the previous month
    const firstDayIndex = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      dates.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(new Date(year, month, i));
    }

    // Calculate days to show from the next month
    const lastDayIndex = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayIndex; i++) {
      dates.push(new Date(year, month + 1, i));
    }

    return dates;
  };

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const goToPreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const calendarDates = generateCalendarDates(year, month);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <div className="text-lg font-semibold shadow px-2 rounded-[5px]">{`${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`}</div>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((day) => (
          <div key={day} className="text-[0.5rem] font-medium text-center text-gray-500">
            {day}
          </div>
        ))}
        {calendarDates.map((date) => (
          <div key={date.toISOString()} className={`font-semibold text-[0.8rem] text-center ${date.getMonth() === month ? "text-black" : "text-gray-500"} ${date.toDateString() === currentDate.toDateString() ? "text-green-500" : ""}`}>
            {date.getDate()}
          </div>
        ))}
      </div>
    </>
  );
};

const CalendarEvents = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await getAllNotes("");
        setNotes(fetchedNotes.data);
        renderCalendar();
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const events = notes.map((note) => ({
    date: formatDate(note.date),
    event: note.title,
    status: note.status,
  }));

  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const renderCalendar = () => {
    if (events.length > 0) {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

      const days = [];
      const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

      if (firstDayOfMonth !== 0) {
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          days.push(
            <div key={`prev-${i}`} className="text-end bg-gray-100 text-top border pl-4 pr-2 pb-8 text-gray-400">
              {daysInPrevMonth - i}
            </div>
          );
        }
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const currentDateStr = `${i}/${currentMonth + 1}/${currentYear}`;
        const eventsOnDate = events.filter((event) => event.date === currentDateStr);
        const statuses = eventsOnDate.map((event) => event.status);

        let columnColor = "";
        if (statuses.includes("Selesai") && statuses.includes("Sedang Berjalan") && statuses.includes("Belum Mulai")) {
          columnColor = "linear-gradient(to right, #34D399, #FCD34D, #9CA3AF)";
        } else if (statuses.includes("Selesai") && statuses.includes("Sedang Berjalan")) {
          columnColor = "linear-gradient(to right, #34D399, #FCD34D)";
        } else if (statuses.includes("Selesai") && statuses.includes("Belum Mulai")) {
          columnColor = "linear-gradient(to right, #34D399, #9CA3AF)";
        } else if (statuses.includes("Sedang Berjalan") && statuses.includes("Belum Mulai")) {
          columnColor = "linear-gradient(to right, #FCD34D, #9CA3AF)";
        } else if (statuses.includes("Selesai")) {
          columnColor = "#34D399";
        } else if (statuses.includes("Sedang Berjalan")) {
          columnColor = "#FCD34D";
        } else if (statuses.includes("Belum Mulai")) {
          columnColor = "#9CA3AF";
        }

        days.push(
          <div key={`curr-${i}`} className={`text-end text-top border pl-4 pr-2 pb-8`} style={{ background: columnColor }}>
            {i}
          </div>
        );
      }

      const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
      if (lastDayOfMonth !== 6) {
        const remainingCells = 6 - lastDayOfMonth;
        for (let i = 1; i <= remainingCells; i++) {
          days.push(
            <div key={`next-${i}`} className="text-end text-top bg-gray-100 border pl-4 pr-2 pb-8 text-gray-400">
              {i}
            </div>
          );
        }
      }

      return (
        <div className="grid grid-cols-7">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold border p-2 bg-[#B1B1B1]">
              {window.innerWidth < 768 ? day.substring(0, 3) : day}
            </div>
          ))}
          {days}
        </div>
      );
    }
  };

  const renderEvents = () => {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const filteredEvents = events.filter((event) => {
      // eslint-disable-next-line no-unused-vars
      const [day, month, year] = event.date.split("/").map(Number);
      return month === currentMonth && year === currentYear;
    });

    const groupedEvents = filteredEvents.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});

    const uniqueEvents = Object.values(groupedEvents);

    return uniqueEvents.map((groupedEvent, index) => {
      const groupedByStatus = groupedEvent.reduce((acc, event) => {
        if (!acc[event.status]) {
          acc[event.status] = [];
        }
        acc[event.status].push(event);
        return acc;
      }, {});

      const uniqueStatus = Object.keys(groupedByStatus);

      return (
        <div key={index} className="text-start h-fit text-top border px-4 pb-2 rounded-[10px] bg-zinc-100">
          <div className="font-bold mb-2">{groupedEvent[0].date.split("/")[0]}</div>
          {uniqueStatus.map((status, statusIndex) => {
            const statusEvents = groupedByStatus[status];
            const statusColor = status === "Belum Mulai" ? "bg-gray-400" : status === "Sedang Berjalan" ? "bg-yellow-500" : "bg-green-500";
            return (
              <div key={statusIndex} className={`py-2 px-4 text-center rounded-md mt-4 text-white ${statusColor}`}>
                {statusEvents.map((event, eventIndex) => (
                  <div key={`${status}-${eventIndex}`}>{event.event}</div>
                ))}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-[100%] py-6 md:px-8 px-2 gap-[25px] rounded-[25px] shadow bg-white">
      <div className="w-full flex justify-center">
        <div className="w-fit px-2.5 py-[9px] bg-white rounded-[10px] shadow justify-center items-center gap-[38px] inline-flex">
          <button onClick={prevMonth} className="text-black text-base font-bold font-['Poppins']">
            &lt;
          </button>
          <div className="text-center text-black text-base font-bold font-['Poppins']">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</div>
          <button onClick={nextMonth} className="text-black text-base font-bold font-['Poppins']">
            &gt;
          </button>
        </div>
      </div>
      {renderCalendar()}
      <div className="text-center text-sky-400 text-[32px] font-bold font-['Poppins']">Catatan</div>
      <div className="flex md:flex-row flex-col flex-wrap md:px-0 px-4 gap-4">{renderEvents()}</div>
    </div>
  );
};

export { Calendar, CalendarEvents };
