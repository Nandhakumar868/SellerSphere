const SearchBox = ({ onSearch }) => {
  return (
    <div className="flex items-center w-full max-w-2xl mx-aut0">
      <input
        type="text"
        placeholder="Search sellers..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBox;
