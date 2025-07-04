export const steps = [
  {
    title: "School Setup",
    subtitle: "Let's get you all set up so you can access the school account.",
    fields: [
      {
        name: "schoolEmail",
        label: "School Email",
        type: "email",
        disapbled: true,
        required: true,
      },
      {
        name: "schoolPhone",
        label: "School Phone Number",
        placeholder: "0904452 3114",
        type: "text",
        required: true,
      },
      {
        name: "schoolAddress",
        label: "School Address",
        placeholder: "EC1X-4021-ZA76",
        type: "text",
        required: true,
      },
      {
        name: "schoolPrefix",
        label: "Prefix (school name initials)",
        placeholder: "MMC",
        type: "text",
        required: true,
      },
    ],
  },
  {
    title: "Upload Documents",
    subtitle: "Upload your school logo and stamp for verification.",
    fields: [
      {
        name: "schoolLogo",
        label: "School Logo",
        type: "file",
        accept: ".jpeg, .webp, .png",
        description:
          "Upload your school logo here (Only *.jpeg, *.webp and *.png images will be accepted)",
        required: true,
      },
      {
        name: "schoolStamp",
        label: "School Stamp",
        type: "file",
        accept: ".jpeg, .webp, .png",
        description:
          "Upload your school stamp here (Only *.jpeg, *.webp and *.png images will be accepted)",
        required: true,
      },
    ],
  },
];
