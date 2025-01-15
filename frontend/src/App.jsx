import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <HomePage />
    </>
  );
}

export default App;
