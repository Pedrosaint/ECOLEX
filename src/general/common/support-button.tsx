

const SupportButtons = () => {
  return (
    <div className="flex flex-col items-end space-y-2">
      <button className="bg-white border border-#4B0082 text-[#8000BD] text-sm px-4 py-2 rounded-lg shadow-sm cursor-pointer">
        Support
      </button>
      <button className="bg-white border border-#4B0082 text-[#8000BD] text-sm px-4 py-2 rounded-lg shadow-sm cursor-pointer">
        I need help on the portal
      </button>
      <button className="bg-white border border-#4B0082 text-[#8000BD] text-sm px-4 py-2 rounded-lg shadow-sm cursor-pointer">
        I’m stucked navigating the portal
      </button>
    </div>
  );
};

export default SupportButtons;
