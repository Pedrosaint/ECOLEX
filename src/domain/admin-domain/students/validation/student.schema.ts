import * as Yup from "yup";

export const studentSchema = Yup.object().shape({
  surname: Yup.string().required("Surname is required"),
  name: Yup.string().required("First name is required"),
  otherNames: Yup.string(),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  email: Yup.string().email("Invalid email address").nullable(),
  guardianName: Yup.string().required("Guardian name is required"),
  guardianNumber: Yup.string()
    .matches(/^\d{7,15}$/, "Guardian number must be 7–15 digits")
    .required("Guardian number is required"),
  campusId: Yup.string().required("Campus selection is required"),
  classId: Yup.string().required("Class selection is required"),
  lifestyle: Yup.string().required("Lifestyle is required"),
  session: Yup.string().required("Session is required"),
});
