import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  test("should render the current page and buttons", () => {
    const handlePreviousPage = jest.fn();
    const handleNextPage = jest.fn();
    const currentPage = 2;
    const totalPages = 5;

    render(
      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    expect(screen.getByText(currentPage.toString())).toBeInTheDocument();

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toBeDisabled();

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
  });

  test("should disable previous button on the first page", () => {
    const handlePreviousPage = jest.fn();
    const handleNextPage = jest.fn();
    const currentPage = 1;
    const totalPages = 5;

    render(
      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();

    const nextButton = screen.getByText("Next");
    expect(nextButton).not.toBeDisabled();
  });

  test("should disable next button on the last page", () => {
    const handlePreviousPage = jest.fn();
    const handleNextPage = jest.fn();
    const currentPage = 5;
    const totalPages = 5;

    render(
      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();

    const previousButton = screen.getByText("Previous");
    expect(previousButton).not.toBeDisabled();
  });

  test("should call the appropriate handlers when buttons are clicked", () => {
    const handlePreviousPage = jest.fn();
    const handleNextPage = jest.fn();
    const currentPage = 3;
    const totalPages = 5;

    render(
      <Pagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);
    expect(handlePreviousPage).toHaveBeenCalledTimes(1);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(handleNextPage).toHaveBeenCalledTimes(1);
  });
});
