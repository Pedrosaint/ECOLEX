import { useState, useMemo } from "react";

interface EventData {
  id: string;
  title: string;
  date: string;
  content: string;
  file: File | null;
}

export function useAddNotice(onClose: () => void) {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: Date.now().toString(),
      title: "",
      date: "",
      content: "",
      file: null,
    },
  ]);
  const [status, setStatus] = useState("approved");

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setEvents(
        events.map((event) =>
          event.id === id ? { ...event, file: selectedFile } : event
        )
      );
    }
  };

  const removeFile = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, file: null } : event
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ events, status });
    onClose();
  };

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        title: "",
        date: "",
        content: "",
        file: null,
      },
    ]);
  };

  const removeEvent = (id: string) => {
    if (events.length > 1) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateEventField = (id: string, field: keyof EventData, value: any) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, [field]: value } : event
      )
    );
  };

  return {
    events,
    status,
    setStatus,
    modules,
    formats,
    handleFileChange,
    removeFile,
    handleSubmit,
    addEvent,
    removeEvent,
    updateEventField,
  };
}
