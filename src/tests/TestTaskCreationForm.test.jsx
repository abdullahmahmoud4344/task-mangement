import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskCreationForm from "../components/TaskCreationForm";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "../store/taskSlice";
import themeReducer from "../store/themeSlice";

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
});

// Mock global fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({}),
});

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders form fields correctly", () => {
    render(
      <Provider store={store}>
        <TaskCreationForm />
      </Provider>
    );

    expect(screen.getByLabelText("Title")).toBeTruthy();
    expect(screen.getByLabelText("Description")).toBeTruthy();
    expect(screen.getByLabelText("Due Date")).toBeTruthy();
    expect(screen.getByLabelText("Priority")).toBeTruthy();
    expect(screen.getByLabelText("Status")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Create Task" })).toBeTruthy();
  });

  test.only("submits the form and dispatches createTask action", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <TaskCreationForm />
      </Provider>
    );

    userEvent.type(screen.getByLabelText(/Title/i), "New Task");
    userEvent.type(screen.getByLabelText(/Description/i), "Task Description");
    userEvent.type(screen.getByLabelText(/Due Date/i), "31-12-2025");
    userEvent.selectOptions(screen.getByLabelText(/Priority/i), "Medium");
    userEvent.selectOptions(screen.getByLabelText(/Status/i), "Pending");

    userEvent.click(screen.getByRole("button", { name: /Create Task/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/tasks",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "New Task",
            description: "Task Description",
            dueDate: "2025-12-31",
            priority: "Medium",
            status: "Pending",
          }),
        })
      )
    );

    expect(toast.success).toHaveBeenCalledWith("New task has been created!");
    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  test("shows error toast on API failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to create task"));

    render(
      <Provider store={store}>
        <TaskCreationForm />
      </Provider>
    );

    userEvent.type(screen.getByLabelText(/Title/i), "New Task");
    userEvent.type(screen.getByLabelText(/Description/i), "Task Description");
    userEvent.type(screen.getByLabelText(/Due Date/i), "2025-12-31");
    userEvent.selectOptions(screen.getByLabelText(/Priority/i), "Medium");
    userEvent.selectOptions(screen.getByLabelText(/Status/i), "Pending");

    userEvent.click(screen.getByRole("button", { name: /Create Task/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Error: Failed to create task")
    );
  });

  test("validates the due date input", () => {
    render(
      <Provider store={store}>
        <TaskCreationForm />
      </Provider>
    );

    userEvent.type(screen.getByLabelText(/Due Date/i), "invalid-date");

    expect(screen.getByText(/Invalid date/i)).toBeInTheDocument();
  });

  test("disables the submit button when the form is invalid", () => {
    render(
      <Provider store={store}>
        <TaskCreationForm />
      </Provider>
    );

    userEvent.type(screen.getByLabelText(/Title/i), "Task");
    userEvent.type(screen.getByLabelText(/Description/i), "Description");

    const submitButton = screen.getByRole("button", { name: /Create Task/i });
    expect(submitButton).toBeEnabled();

    // Simulate invalid date
    userEvent.type(screen.getByLabelText(/Due Date/i), "invalid-date");
    expect(submitButton).toBeDisabled();
  });
});
