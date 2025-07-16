import * as Yup from "yup";


export const registerSchema = Yup.object().shape({
  email: Yup.string()
  .required("School email is required"),

  schoolName: Yup.string()
    .required("School name is required"),
 
});


export const superAdminSchema = () => {
return Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
 

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  uniqueKey: Yup.string()
    .required("Token is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
}


//superAdmin Login+++++++++++++++++++++++++++++++++++++++++++++

export const superAdminLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().required("Password is required"),
});


// Schema for school setup form++++++++++++++++++++++++++++

export const schoolSetupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string().email().required("Email is required"),

  phoneNumber: Yup.string().required("Phone number is required"),

  address: Yup.string().required("Address is required"),

  prefix: Yup.string().required("Prefix is required"),

  logoUrl: Yup.mixed()
    .required("Logo is required")
    .nullable()
    .notRequired()
    .test("required", "Logo is required", (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test("fileType", "only images are accepted", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return false;
      const file = value[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const validExtensions = [".jpeg", ".jpg", ".png", ".webp"];

      return (
        validTypes.includes(file.type) ||
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );
    }),

  stampUrl: Yup.mixed()
    .required("stamp is required")
    .nullable()
    .notRequired()
    .test("required", "Stamp is required", (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test("fileType", "only images are accepted", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return false;
      const file = value[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const validExtensions = [".jpeg", ".jpg", ".png", ".webp"];

      return (
        validTypes.includes(file.type) ||
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );
    }),
});