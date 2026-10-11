import { render, screen, fireEvent } from "@testing-library/react";
import Appointment from "./Appointment";

const today = new Date();
const monthName = today.toLocaleDateString("en-US", { month: "long" });
const thisYear = today.getFullYear();

const nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const nextDayLabel = nextDay.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

test("time slots are disabled until a date is chosen", () => {
  render(<Appointment />);

  expect(screen.getByText(`${monthName} ${thisYear}`)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "9:00 AM" })).toBeDisabled();
  expect(screen.getByRole("button", { name: /request appointment/i })).toBeDisabled();
});

test("choosing a date enables time slots and reveals the selected date", () => {
  render(<Appointment />);

  fireEvent.click(screen.getByLabelText(nextDayLabel));

  expect(screen.getByRole("button", { name: "9:00 AM" })).toBeEnabled();
  expect(screen.getByText(new RegExp(nextDayLabel))).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "9:00 AM" }));
  expect(screen.getByRole("button", { name: /request appointment/i })).toBeEnabled();
});
