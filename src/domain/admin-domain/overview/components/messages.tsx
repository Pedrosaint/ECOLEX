import { MoreHorizontal } from "lucide-react";

export default function Messages() {
  const messages = [
    {
      id: 1,
      name: "Jane Cooper",
      message: "Don't forget the lab rep...",
      time: "12:34 pm",
      avatar: "bg-orange-400",
    },
    {
      id: 2,
      name: "Kristin Watson",
      message: "Do we have maths test...",
      time: "12:34 pm",
      avatar: "bg-red-400",
    },
    {
      id: 3,
      name: "Jenny Wilson",
      message: "What?",
      time: "12:34 pm",
      avatar: "bg-blue-400",
    },
    {
      id: 4,
      name: "Brooklyn Sim",
      message: "Did Sachin gave any M...",
      time: "12:34 pm",
      avatar: "bg-gray-400",
    },
  ];

  return (
    <div className="mt-5">
      <div className="bg-white rounded-4xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-sans">Messages</h2>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 ${message.avatar} rounded-full flex-shrink-0`}
              ></div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {message.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
