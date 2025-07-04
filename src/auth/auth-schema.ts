import * as Yup from "yup";

// Mock registered user data (replace with your actual data)
const REGISTERED_USER = {
  email: "admin@gmail.com",
  name: "Admin",
};

const usedTokens: string[] = []; 

export const superAdminSchema = Yup.object().shape({
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
      return !usedTokens.includes(value); // Assume `usedTokens` is an array of spent tokens
    }),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});


// Schema for school setup form++++++++++++++++++++++++++++

export const schoolSetupSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  number: Yup.string().required("Phone number is required"),
  token: Yup.string().required("Address is required"),
  prefix: Yup.string().required("Prefix is required"),
  logo: Yup.mixed<FileList>()
    .required("Logo is required")
    .test("fileType", "Only images are accepted", (value) => {
      if (!value || value.length === 0) return false;
      const file = value[0];
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }),
  stamp: Yup.mixed<FileList>()
    .required("Stamp is required")
    .test("fileType", "Only images are accepted", (value) => {
      if (!value || value.length === 0) return false;
      const file = value[0];
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }),
});