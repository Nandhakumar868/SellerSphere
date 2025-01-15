import { useState } from "react";
import { toast } from "react-toastify";

const AddReviewForm = ({ onReviewAdded, onClose }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, reviews }),
      });
      if (response.ok) {
        const newSeller = await response.json(); // Get the newly created seller
        onReviewAdded(newSeller); // Pass the new seller to the parent
        onClose(); // Close the form after submission
      } else {
        toast.error("Failed to add review.", {
          position: "top-right", // You can change this to "top-left", "bottom-right", etc.
          autoClose: 2000, // Time in milliseconds before the toast disappears
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", // Options: "light", "dark", "colored"
        });
      }
    } catch (error) {
      console.error("Add review error:", error);
      toast.error("Something went wrong! Please try again.", {
        position: "top-right", // You can change this to "top-left", "bottom-right", etc.
        autoClose: 3000, // Time in milliseconds before the toast disappears
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // Options: "light", "dark", "colored"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Add a New Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Seller Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-gray-700">
              Review
            </label>
            <textarea
              id="review"
              value={reviews}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
