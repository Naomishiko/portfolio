import React, { useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarAlt,
  FaRegClock,
} from "react-icons/fa";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];
const FORM_ENDPOINT =
  "https://getform.io/f/1d7a354f-ff32-4f8d-862f-83bcc0789a1a";

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const fieldClass =
  "rounded-lg border border-gold-400/25 bg-ink/60 p-3 text-beige-50 placeholder-beige-500 transition-colors duration-200 focus:border-gold-400 focus:outline-none";

const Appointment = () => {
  const today = startOfDay(new Date());
  const [view, setView] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const days = useMemo(() => {
    const leadingBlanks = view.getDay();
    const daysInMonth = new Date(
      view.getFullYear(),
      view.getMonth() + 1,
      0
    ).getDate();
    const cells = Array(leadingBlanks).fill(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(view.getFullYear(), view.getMonth(), day));
    }
    return cells;
  }, [view]);

  const changeMonth = (delta) => {
    const next = new Date(view.getFullYear(), view.getMonth() + delta, 1);
    if (next < firstOfMonth) return;
    setView(next);
  };

  const pickDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStatus("idle");
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setStatus("submitting");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("appointment_date", dateLabel);
    formData.append("appointment_time", selectedTime);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const reset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <div
      name="appointment"
      className="w-full bg-gradient-to-b from-espresso to-ink py-24"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-beige-50 sm:text-5xl md:text-6xl">
            Book an <span className="text-gold-400">Appointment</span>
          </p>
          <div className="gold-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-beige-300">
            Pick a date and time that works for you and I&apos;ll be in touch to
            confirm.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl border border-gold-400/25 bg-ink/50 p-6 shadow-soft sm:p-8 md:grid-cols-2">
          {/* Calendar */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                disabled={view <= firstOfMonth}
                aria-label="Previous month"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 transition-colors duration-200 enabled:hover:bg-gold-400 enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FaChevronLeft size={12} />
              </button>
              <p className="font-serif text-xl text-beige-50">
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </p>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 transition-colors duration-200 hover:bg-gold-400 hover:text-ink"
              >
                <FaChevronRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-beige-500"
                >
                  {day}
                </span>
              ))}

              {days.map((date, index) => {
                if (!date) return <span key={`blank-${index}`} />;

                const isPast = date < today;
                const isSelected =
                  selectedDate && date.getTime() === selectedDate.getTime();
                const isToday = date.getTime() === today.getTime();

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => pickDate(date)}
                    disabled={isPast}
                    aria-label={date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    aria-pressed={Boolean(isSelected)}
                    className={[
                      "flex aspect-square items-center justify-center rounded-lg font-sans text-sm transition-all duration-200",
                      isSelected
                        ? "bg-gradient-to-br from-gold-500 to-gold-300 font-semibold text-ink shadow-gold"
                        : isPast
                        ? "cursor-not-allowed text-beige-800"
                        : "text-beige-100 hover:bg-gold-400/20 hover:text-gold-200",
                      !isSelected && isToday
                        ? "ring-1 ring-gold-400/60"
                        : "",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details and form */}
          <div className="flex flex-col">
            {status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="font-serif text-3xl text-gold-400">
                  Thank you!
                </p>
                <p className="mt-4 max-w-xs font-sans font-light text-beige-200">
                  Your request for{" "}
                  <span className="text-beige-50">
                    {dateLabel} at {selectedTime}
                  </span>{" "}
                  has been sent. I&apos;ll confirm by email shortly.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 rounded-full border border-gold-400/40 px-6 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 transition-colors duration-200 hover:bg-gold-400 hover:text-ink"
                >
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                <div className="mb-4 flex items-center gap-2 font-sans text-sm text-beige-300">
                  <FaRegCalendarAlt className="text-gold-400" />
                  <span>
                    {selectedDate ? dateLabel : "Select a date to continue"}
                  </span>
                </div>

                <div className="mb-6 flex items-center gap-2 font-sans text-sm text-beige-300">
                  <FaRegClock className="text-gold-400" />
                  <span>Available times</span>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!selectedDate}
                        onClick={() => {
                          setSelectedTime(slot);
                          setStatus("idle");
                        }}
                        aria-pressed={isSelected}
                        className={[
                          "rounded-lg border py-2 font-sans text-xs transition-all duration-200",
                          isSelected
                            ? "border-gold-400 bg-gradient-to-br from-gold-500 to-gold-300 font-semibold text-ink"
                            : "border-gold-400/25 text-beige-200 enabled:hover:border-gold-400/60 enabled:hover:text-gold-200",
                          !selectedDate
                            ? "cursor-not-allowed opacity-40"
                            : "",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className={`mb-3 ${fieldClass}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={`mb-3 ${fieldClass}`}
                />
                <textarea
                  name="message"
                  placeholder="Anything you'd like me to know? (optional)"
                  rows="3"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={`mb-5 ${fieldClass}`}
                />

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || status === "submitting"}
                  className="mt-auto flex items-center justify-center rounded-full border border-gold-300/50 bg-gradient-to-r from-gold-500 to-gold-300 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-gold transition-transform duration-300 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "submitting" ? "Sending..." : "Request Appointment"}
                </button>

                {status === "error" && (
                  <p className="mt-3 text-center font-sans text-sm text-gold-200">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
