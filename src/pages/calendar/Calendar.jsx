import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./EventUtils"; // ensure path points to your utils file
import "./calendar.css"; // ensure path points to your stylesheet

const STORAGE_KEY = "cal_events_v1";

/**
 * Helpers: safe guards for window/localStorage
 */
const hasWindow = () => typeof window !== "undefined";
const hasStorage = () =>
  hasWindow() && typeof window.localStorage !== "undefined";

/**
 * Read events from localStorage safely.
 * Always normalize to an array of objects compatible with FullCalendar's EventInput.
 */
const loadEvents = () => {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr)
      ? arr.map((e) => ({
          id: e.id ?? createEventId(),
          title: e.title ?? "",
          start: e.start ?? null,
          end: e.end ?? null,
          allDay: !!e.allDay,
        }))
      : [];
  } catch {
    return [];
  }
};

/**
 * Write events to localStorage safely.
 * Converts Date objects to ISO strings when needed.
 */
const saveEvents = (events) => {
  if (!hasStorage()) return;
  try {
    const plain = events.map((e) => ({
      id: e.id,
      title: e.title,
      start: e.startStr ?? e.start?.toISOString?.() ?? e.start ?? null,
      end: e.endStr ?? e.end?.toISOString?.() ?? e.end ?? null,
      allDay: !!e.allDay,
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plain));
  } catch {
    // swallow storage errors silently
  }
};

export default function Calendar() {
  const [weekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]); // for Sidebar
  const [theme, setTheme] = useState("light");

  // Compact header on very small screens (guarded)
  const initialCompact = useMemo(() => {
    if (!hasWindow() || !window.matchMedia) return false;
    return window.matchMedia("(max-width: 480px)").matches;
  }, []);
  const [compact, setCompact] = useState(initialCompact);

  useEffect(() => {
    if (!hasWindow() || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 480px)");
    const handler = (e) => setCompact(e.matches);
    mq.addEventListener?.("change", handler);
    // Fallback for legacy Safari
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);

  // Follow dashboard theme (class="dark" or data-theme="dark")
  useEffect(() => {
    if (!hasWindow() || typeof MutationObserver === "undefined") return;

    const root = document.documentElement;
    const body = document.body;

    const getThemeFromDOM = () => {
      const isDarkClass =
        root.classList.contains("dark") || body.classList.contains("dark");
      const isDarkData =
        root.getAttribute("data-theme") === "dark" ||
        body.getAttribute("data-theme") === "dark";
      return isDarkClass || isDarkData ? "dark" : "light";
    };

    setTheme(getThemeFromDOM());

    const obs = new MutationObserver(() => setTheme(getThemeFromDOM()));
    obs.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    obs.observe(body, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  const handleDateSelect = (selectInfo) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  // Persist events to localStorage whenever calendar mutates
  const handleEvents = (events) => {
    setCurrentEvents(events);
    saveEvents(events);
  };

  return (
    <div className={`cal-app ${theme === "dark" ? "cal-dark" : ""}`}>
      <div className="cal-grid">
        <div className="cal-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            dayHeaderFormat={
              compact
                ? { weekday: "narrow" }
                : { weekday: "short", day: "numeric" }
            }
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={loadEvents()}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            height="auto"
            expandRows={true}
            stickyHeaderDates={true}
            nowIndicator={true}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventColor="var(--fc-event-bg)"
            eventTextColor="var(--fc-event-text)"
          />
        </div>

        {/* Sidebar */}
        <Sidebar currentEvents={currentEvents} />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>&nbsp;<i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ currentEvents }) {
  return (
    <aside className="cal-sidebar">
      <div className="cal-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul className="cal-events-list">
          {currentEvents.map((event, i) => (
            <SidebarEvent
              key={`${event.id ?? "noid"}-${
                event.startStr ?? event.start ?? ""
              }-${i}`}
              event={event}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

function SidebarEvent({ event }) {
  return (
    <li className="cal-event-item">
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
