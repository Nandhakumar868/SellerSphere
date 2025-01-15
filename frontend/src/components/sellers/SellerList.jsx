import SellerCard from "./SellerCard";

const SellerList = ({
  sellers,
  currentPage,
  totalPages,
  onPageChange,
  countPerPage,
  setCountPerPage,
}) => {
  const startIndex = (currentPage - 1) * countPerPage;
  const paginatedSellers = sellers.slice(startIndex, startIndex + countPerPage);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {paginatedSellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>

      {/* Show pagination controls only if the seller list is greater than 10 */}
      {sellers.length > 10 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            &lt;
          </button>

          <div className="flex items-center space-x-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <select
              value={countPerPage}
              onChange={(e) => {
                setCountPerPage(Number(e.target.value));
                onPageChange(1);
              }}
              className="border p-2 rounded"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerList;
