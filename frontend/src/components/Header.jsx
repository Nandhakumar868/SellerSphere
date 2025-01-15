import { useState } from "react";

const Header = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto relative">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center">
            <img
              src="./image.png"
              alt="Icon"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold">Seller Sphere</h1>
        </div>
        {isLoggedIn && (
          <>
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>

            {/* Navigation Links */}
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } absolute top-full left-0 w-full bg-blue-500 md:static md:flex md:w-auto md:bg-transparent`}
            >
              <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
                <li>
                  <a
                    href="#home"
                    className="hover:underline block text-center md:inline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:underline block text-center md:inline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:underline block text-center md:inline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="flex justify-center mt-2 md:mt-0">
                <button
                  onClick={onLogout}
                  className="bg-red-500 px-4 py-2 mb-2 rounded hover:bg-red-600 md:ml-4"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
