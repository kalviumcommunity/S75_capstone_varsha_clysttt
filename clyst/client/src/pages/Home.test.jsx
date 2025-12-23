import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Home Page Tests", () => {

  test("1. Renders main heading", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByText(/Find the Perfect College in Tamil Nadu/i)
    ).toBeInTheDocument();
  });

  test("2. Search input updates value when typing", () => {
    renderWithRouter(<Home />);
    const input = screen.getByLabelText("Search colleges");
    fireEvent.change(input, { target: { value: "Chennai" } });
    expect(input.value).toBe("Chennai");
  });

  test("3. Search button exists", () => {
    renderWithRouter(<Home />);
    const button = screen.getByText("Search");
    expect(button).toBeInTheDocument();
  });

  test("4. Renders all category cards", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Medical")).toBeInTheDocument();
    expect(screen.getByText("Arts")).toBeInTheDocument();
  });

  test("5. Renders top colleges section", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByText(/Top Rated Colleges/i)
    ).toBeInTheDocument();
  });

});
