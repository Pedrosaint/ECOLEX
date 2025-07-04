import * as Yup from "yup";

// Mock registered user data (replace with your actual data)
const REGISTERED_USER = {
  email: "admin@gmail.com",
  name: "Admin",
};

// Example array of used tokens (replace with your actual logic or import)
const usedTokens: string[] = []; // TODO: Replace with real used tokens logic

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .notOneOf(
      [REGISTERED_USER.name],
      "Name must be different from the registered one"
    ),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .notOneOf(
      [REGISTERED_USER.email],
      "Email must be different from the registered one"
    ),

  token: Yup.string()
    .required("Token is required")
    .test("Token can only be used once", (value) => {
      // Replace with your logic to check if token was already used (e.g., API call)
      return !usedTokens.includes(value); // Assume `usedTokens` is an array of spent tokens
    }),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});