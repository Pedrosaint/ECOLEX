// import {
//   X,
//   Search,
//   Minus,
//   Plus,
//   Bold,
//   Italic,
//   Underline,
//   AlignLeft,
//   AlignRight,
//   AlignCenter,
//   AlignJustify,
//   List,
//   ListOrdered,
//   Table,
// } from "lucide-react";
// // import "wysiwyg/dist/wysiwyg.css";

// export default function AddNewNoticeModal({ onClose }: { onClose: () => void }) {

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-3">
//         <div>
//           <div
//             className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
//               <h2 className="text-2xl font-medium text-gray-900 font-inter">
//                 Add New Events
//               </h2>
//               <button
//                 className="p-1 rounded-full border border-gray-300 transition-colors shadow-md"
//                 onClick={onClose}
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
//               {/* Event Title */}
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="event-title"
//                   className="text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Event Title
//                 </label>
//                 <input
//                   id="event-title"
//                   type="text"
//                   className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
//                 />
//               </div>

//               {/* Date */}
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="event-date"
//                   className="text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Date
//                 </label>
//                 <div className="">
//                   <input
//                     id="event-date"
//                     type="date"
//                     className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Event Description (Rich Text Editor Simulation) */}
//             <div className="flex flex-col mb-6">
//               <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap items-center gap-2 text-gray-600">
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Edit"
//                 >
//                   <Search className="h-4 w-4" />
//                 </button>
//                 <span className="h-5 w-px bg-gray-300 mx-1" /> {/* Separator */}
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Decrease font size"
//                 >
//                   <Minus className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Increase font size"
//                 >
//                   <Plus className="h-4 w-4" />
//                 </button>
//                 <span className="h-5 w-px bg-gray-300 mx-1" /> {/* Separator */}
//                 <span className="text-sm">Helvetica World</span>
//                 <span className="text-sm">10.3</span>
//                 <span className="h-5 w-px bg-gray-300 mx-1" /> {/* Separator */}
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Bold"
//                 >
//                   <Bold className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Italic"
//                 >
//                   <Italic className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Underline"
//                 >
//                   <Underline className="h-4 w-4" />
//                 </button>
//                 <span className="h-5 w-px bg-gray-300 mx-1" /> {/* Separator */}
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Align Left"
//                 >
//                   <AlignLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Align Center"
//                 >
//                   <AlignCenter className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Align Right"
//                 >
//                   <AlignRight className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Justify"
//                 >
//                   <AlignJustify className="h-4 w-4" />
//                 </button>
//                 <span className="h-5 w-px bg-gray-300 mx-1" /> {/* Separator */}
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Unordered List"
//                 >
//                   <List className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Ordered List"
//                 >
//                   <ListOrdered className="h-4 w-4" />
//                 </button>
//                 <button
//                   className="p-1 rounded hover:bg-gray-200"
//                   aria-label="Table"
//                 >
//                   <Table className="h-4 w-4" />
//                 </button>
//               </div>
//               <textarea
//                 id="event-description"
//                 placeholder="Enter Event Description"
//                 rows={6}
//                 className="flex w-full rounded-b-md border border-t-0 border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none resize-y"
//               />
//             </div>

//             {/* File Input and Status */}
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
//               <div className="flex items-center gap-2">
//                 <label
//                   htmlFor="file-upload"
//                   className="inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-[#6E6D71] bg-white hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer"
//                 >
//                   Choose File
//                 </label>
//                 <input id="file-upload" type="file" className="sr-only" />
//                 <span className="text-sm text-gray-500">No File Chosen</span>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-medium text-gray-700">
//                   Status:
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <input
//                     id="status-approved"
//                     type="radio"
//                     name="event-status"
//                     value="approved"
//                     className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//                   />
//                   <label
//                     htmlFor="status-approved"
//                     className="text-sm text-gray-700"
//                   >
//                     Approved
//                   </label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <input
//                     id="status-unapproved"
//                     type="radio"
//                     name="event-status"
//                     value="unapproved"
//                     className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//                   />
//                   <label
//                     htmlFor="status-unapproved"
//                     className="text-sm text-gray-700"
//                   >
//                     Unapproved
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex md:w-1/3 gap-4">
//               <button className="w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-[#8000BD] bg-gray-100 text-[#8000BD] hover:bg-gray-200 h-9 px-4 py-2">
//                 Add More
//               </button>
//               <button className="w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white h-9 px-4 py-2">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








import { X } from "lucide-react";
import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion, AnimatePresence } from "framer-motion";

export default function AddNewNoticeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, date, content, file, status });
  };

  return (
    <AnimatePresence>
      {/* Overlay with fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-3"
      >
        {/* Modal container with spring animation */}
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
          {/* Header with subtle animation */}
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

          <form onSubmit={handleSubmit}>
            {/* Form fields with staggered animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6"
            >
              {/* Event Title */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <motion.input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </motion.div>

              {/* Date */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col"
              >
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <motion.input
                  type="date"
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Editor with animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col mb-6"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">
                Event Description
              </label>
              <motion.div
                className="rounded-md border border-gray-300 overflow-hidden"
              >
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Enter event description..."
                  className="h-[200px] mb-10"
                />
              </motion.div>
            </motion.div>

            {/* File and status section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <motion.label
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-[#6E6D71] bg-white hover:bg-gray-100 h-9 px-4 py-2 cursor-pointer"
                >
                  Choose File
                </motion.label>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <motion.span
                  animate={file ? { x: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-500"
                >
                  {file ? file.name : "No File Chosen"}
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    id="status-approved"
                    type="radio"
                    name="event-status"
                    value="approved"
                    checked={status === "approved"}
                    onChange={() => setStatus("approved")}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="status-approved"
                    className="text-sm text-gray-700"
                  >
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
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="status-unapproved"
                    className="text-sm text-gray-700"
                  >
                    Unapproved
                  </label>
                </div>
              </motion.div>
            </motion.div>

            {/* Action buttons with animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex md:w-1/3 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
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