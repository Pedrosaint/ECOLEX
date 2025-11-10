/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { renderWithProviders } from "../../../../utils/test-utils";
import AddStaffFormModal from "./add-staff.modal";

// Mock Sonner (toast + Toaster)
vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Framer Motion (skip animation)
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
  },
}));

// Mock staff API mutation
const mockCreateStaff = vi.fn();
vi.mock("../../staff/api/staff-api", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useCreateStaffMutation: () => [mockCreateStaff, { isLoading: false }],
  };
});

// Mock campus API query
vi.mock("../../campus/api/campus.api", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useGetCampusQuery: () => ({
      data: {
        campuses: [
          { id: 1, name: "Main Campus" },
          { id: 2, name: "North Campus" },
        ],
      },
    }),
  };
});

describe("AddStaffFormModal Component", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);
    expect(screen.getByText("Register New Staff")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);
    const closeBtn = screen.getAllByRole("button")[0];
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("updates input fields correctly", async () => {
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);

    await userEvent.type(screen.getByLabelText("Staff's Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.type(screen.getByLabelText("Phone Number"), "08012345678");

    expect(screen.getByLabelText("Staff's Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
    expect(screen.getByLabelText("Phone Number")).toHaveValue("08012345678");
  });

  it("selects a campus from dropdown", async () => {
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);

    // use findByText to be safe (handles accessibility issues)
    await userEvent.click(await screen.findByText(/select a campus/i));
    await userEvent.click(screen.getByText("Main Campus"));

    expect(screen.getByText("Main Campus")).toBeInTheDocument();
  });

  it("shows success toast when form saves successfully", async () => {
    mockCreateStaff.mockReturnValue({
      unwrap: () => Promise.resolve({ success: true }),
    });

    const { toast } = await import("sonner");
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);

    await userEvent.type(screen.getByLabelText("Staff's Name"), "Jane Doe");
    await userEvent.type(screen.getByLabelText("Email"), "jane@example.com");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Staff created successfully!");
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("shows error toast when API fails", async () => {
    mockCreateStaff.mockReturnValue({
      unwrap: () =>
        Promise.reject({ data: { message: "Something went wrong" } }),
    });

    const { toast } = await import("sonner");
    renderWithProviders(<AddStaffFormModal onClose={onClose} />);

    await userEvent.type(screen.getByLabelText("Staff's Name"), "John Doe");
    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });
});
