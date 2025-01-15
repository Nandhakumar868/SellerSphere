const SellerCard = ({ seller }) => {
  return (
    <div className="border py-6 px-4 rounded-lg shadow-md mb-6 bg-white max-w-full overflow-hidden">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-black mr-2 inline-block">
          Seller Name:
        </h4>
        <p className="text-lg text-gray-800 inline-block break-words">
          {seller.name}
        </p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-black mr-2 inline-block">
          Rating:
        </h4>
        <p className="text-lg text-gray-800 inline-block break-words">
          {seller.rating}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-black mr-2 inline-block">
          Reviews:
        </h4>
        <p className="text-lg text-gray-800 inline-block break-words">
          {seller.reviews}
        </p>
      </div>
    </div>
  );
};

export default SellerCard;
