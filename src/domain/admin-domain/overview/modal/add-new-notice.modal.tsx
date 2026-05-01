import { X, File } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion, AnimatePresence } from "framer-motion";
import { useAddNotice } from "../hooks";

export default function AddNewNoticeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
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
  } = useAddNotice(onClose);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 flex items-start md:items-center justify-center p-3 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6"
          >
            <h2 className="text-2xl font-medium text-gray-900 font-inter">
              Add New Events
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 rounded-full border border-gray-300 transition-colors shadow-md"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-gray-500" />
            </motion.button>
          </motion.div>

          <form onSubmit={handleSubmit} className="">
            <div className="p-4 overflow-y-auto">
              <div className="space-y-5 h-[550px]">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative border border-gray-200 rounded-lg p-3"
                  >
                    {events.length > 1 && (
                      <motion.button
                        type="button"
                        onClick={() => removeEvent(event.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 z-10"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                      {/* Event Title */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                          value={event.title}
                          onChange={(e) =>
                            updateEventField(event.id, "title", e.target.value)
                          }
                          required
                        />
                      </div>

                      {/* Date */}
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={event.date}
                          onChange={(e) =>
                            updateEventField(event.id, "date", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Editor */}
                    <div className="flex flex-col mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Event Description
                      </label>
                      <div className="rounded-md border border-gray-300 overflow-hidden">
                        <ReactQuill
                          theme="snow"
                          value={event.content}
                          onChange={(value) =>
                            updateEventField(event.id, "content", value)
                          }
                          modules={modules}
                          formats={formats}
                          placeholder="Enter event description..."
                          className="h-[200px] mb-10"
                        />
                      </div>
                    </div>

                    {/* File section */}
                    <div className="space-y-3">
                      <motion.label
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        htmlFor={`file-upload-${event.id}`}
                        className="inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-[#6E6D71] bg-white hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer"
                      >
                        Choose File
                      </motion.label>

                      <input
                        id={`file-upload-${event.id}`}
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, event.id)}
                      />

                      {event.file ? (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative flex gap-2 items-center border border-blue-300 rounded-md bg-blue-50 p-2 text-[10px] text-gray-700 shadow-sm w-50"
                        >
                          <div className="p-2 bg-blue-100 rounded-md flex items-center justify-center">
                            <File className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="truncate">{event.file.name}</span>
                          <button
                            onClick={() => removeFile(event.id)}
                            className="ml-3 text-gray-400 hover:text-red-500 transition cursor-pointer"
                          >
                            <X size={18} />
                          </button>
                        </motion.div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No file chosen yet.
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mt-6"
            >
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex items-center gap-2">
                <input
                  id="status-approved"
                  type="radio"
                  name="event-status"
                  value="approved"
                  checked={status === "approved"}
                  onChange={() => setStatus("approved")}
                />
                <label htmlFor="status-approved" className="text-sm text-gray-700">
                  Approved
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="status-unapproved"
                  type="radio"
                  name="event-status"
                  value="unapproved"
                  checked={status === "unapproved"}
                  onChange={() => setStatus("unapproved")}
                />
                <label htmlFor="status-unapproved" className="text-sm text-gray-700">
                  Unapproved
                </label>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex md:w-1/3 gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={addEvent}
                className="w-full rounded-md text-sm font-medium cursor-pointer focus-visible:outline-none border border-[#8000BD] bg-gray-100 text-[#8000BD] h-9 px-4 py-2"
              >
                Add More
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white h-9 px-4 py-2 cursor-pointer"
              >
                Add
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
