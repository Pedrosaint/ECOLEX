/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { renderWithProviders } from "../../../../utils/test-utils";
import AssignStaffModal from "./assign-teacher.modal";


// ✅ Mock Sonner (toast)
vi.mock("sonner", () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

// ✅ Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
  },
}));

// ✅ Mock API hooks
const mockAssignTeacher = vi.fn();

vi.mock("../api/staff-api", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useAssignTeacherMutation: () => [mockAssignTeacher, { isLoading: false }],
    useGetStaffsQuery: () => ({
      data: {
        staff: [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Smith" },
        ],
      },
    }),
  };
});

vi.mock("../../classes/api/class-api", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useGetClassesQuery: () => ({
      data: {
        classes: [
          { id: 1, name: "Class A" },
          { id: 2, name: "Class B" },
        ],
      },
    }),
  };
});

vi.mock("../../manage-subject/api/subject.api", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useGetAllSubjectQuery: () => ({
      data: {
        subjects: [
          { id: 1, name: "Mathematics" },
          { id: 2, name: "English" },
        ],
      },
    }),
  };
});

describe("🧪 AssignStaffModal Component", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithProviders(<AssignStaffModal onClose={onClose} />);
    expect(screen.getByText("Assign Teacher")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /assign/i })).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    renderWithProviders(<AssignStaffModal onClose={onClose} />);
    const closeBtn = screen.getAllByRole("button")[0];
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("shows warning toast if fields are incomplete", async () => {
    const { toast } = await import("sonner");
    renderWithProviders(<AssignStaffModal onClose={onClose} />);

    const assignBtn = screen.getByRole("button", { name: /assign/i });
    await userEvent.click(assignBtn);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        "Please select a staff member."
      );
    });
  });

  it("shows success toast when assignment succeeds", async () => {
    mockAssignTeacher.mockReturnValue({
      unwrap: () => Promise.resolve({ success: true }),
    });

    const { toast } = await import("sonner");
    renderWithProviders(<AssignStaffModal onClose={onClose} />);

    // Select Staff
    await userEvent.click(screen.getByText(/select staff/i));
    await userEvent.click(screen.getByText("John Doe"));

    // Select Subject
    await userEvent.click(screen.getByText(/select subject/i));
    await userEvent.click(screen.getByText("Mathematics"));
    await userEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    // Select Class
    await userEvent.click(screen.getByText(/select class/i));
    await userEvent.click(screen.getByText("Class A"));
    await userEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    // Click Assign
    await userEvent.click(screen.getByRole("button", { name: /assign/i }));

    await waitFor(() => {
      expect(mockAssignTeacher).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "Teacher assigned successfully!"
      );
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("shows error toast when API fails", async () => {
    mockAssignTeacher.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: "API failed" } }),
    });

    const { toast } = await import("sonner");
    renderWithProviders(<AssignStaffModal onClose={onClose} />);

    // Fill form
    await userEvent.click(screen.getByText(/select staff/i));
    await userEvent.click(screen.getByText("John Doe"));

    await userEvent.click(screen.getByText(/select subject/i));
    await userEvent.click(screen.getByText("Mathematics"));
    await userEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    await userEvent.click(screen.getByText(/select class/i));
    await userEvent.click(screen.getByText("Class A"));
    await userEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    await userEvent.click(screen.getByRole("button", { name: /assign/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "An error occurred while assigning teacher."
      );
    });
  });
});
