import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"

export default function CalendarComponent({ onDateClick }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      dateClick={(info) => onDateClick(info.dateStr)}
    />
  )
}
