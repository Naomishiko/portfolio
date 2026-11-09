import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";

test("hamburger opens and closes the mobile menu", () => {
  render(<NavBar />);

  fireEvent.click(screen.getByLabelText("Toggle menu"));
  expect(screen.getAllByText("about")).toHaveLength(2);

  fireEvent.click(screen.getByLabelText("Toggle menu"));
  expect(screen.getAllByText("about")).toHaveLength(1);
});
