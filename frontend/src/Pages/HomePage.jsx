import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import SearchBox from "../components/SearchBox";
import SellerList from "../components/sellers/SellerList";
import AddReviewForm from "../components/sellers/AddReviewForm";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      const response = await fetch("http://localhost:5000/api/sellers");
      const data = await response.json();
      setSellers(data);
    };
    fetchSellers();
  }, []);

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRating && selectedRating.length > 0
        ? selectedRating.includes(seller.rating)
        : true)
  );

  const totalPages = Math.ceil(filteredSellers.length / countPerPage);

  const handleReviewAdded = (newSeller) => {
    setSellers((prevSellers) => [...prevSellers, newSeller]);
    setShowAddReview(false);
    setPopupMessage("Review added successfully!");
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
    setShowRatingFilter(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      <main className="flex-grow p-4">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)]">
            {isRegistering ? (
              <RegisterForm onRegister={() => setIsRegistering(false)} />
            ) : (
              <LoginForm onLogin={() => setIsLoggedIn(true)} />
            )}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="mt-4 text-blue-500 underline"
            >
              {isRegistering ? "Already a user? Login" : "New User? Register"}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center gap-4 mb-4">
              <SearchBox onSearch={setSearchTerm} />
              <button
                onClick={() => setShowRatingFilter(true)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow-md"
              >
                <span className="material-icons mr-2">filter_list</span>
                Filter
              </button>
              <button
                onClick={() => setShowAddReview(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 shadow-md"
              >
                Add Review
              </button>
            </div>

            <SellerList
              sellers={filteredSellers}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              countPerPage={countPerPage}
              setCountPerPage={setCountPerPage}
            />
          </div>
        )}
      </main>
      {showAddReview && (
        <AddReviewForm
          onReviewAdded={handleReviewAdded}
          onClose={() => setShowAddReview(false)}
        />
      )}
      {popupMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow">
          {popupMessage}
        </div>
      )}
      {showRatingFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Filter by Rating</h2>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => {
                    if (selectedRating && selectedRating.includes(rating)) {
                      // Remove the rating if it's already selected
                      setSelectedRating((prev) =>
                        prev.filter((r) => r !== rating)
                      );
                    } else {
                      // Add the rating if it's not selected
                      setSelectedRating((prev) =>
                        prev ? [...prev, rating] : [rating]
                      );
                    }
                  }}
                  className={`px-4 py-2 rounded-full ${
                    selectedRating && selectedRating.includes(rating)
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {rating} Star{rating > 1 ? "s" : ""}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowRatingFilter(false)}
                className="text-red-500 underline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedRating(null);
                  setShowRatingFilter(false);
                }}
                className="text-blue-500 underline"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setShowRatingFilter(false)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
