import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
}

const navItems: NavItem[] = [
  { label: "Home" },
  { label: "About Us" },
  { label: "Contact Us" },
];

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <h1 className="text-xl font-bold text-gray-800">
            ShadowReviewer
          </h1>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6">

            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}

            {/* Docs Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black font-medium">
                Docs
                <ChevronDown size={16} />
              </div>

              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Getting Started
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  API Examples
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Integration Guide
                </a>

              </div>
            </div>

          </div>

          {/* Button */}
          <Button
            title="Login"
            size="md"
            variant="secondary"
            onClick={() => {
              navigate('/signin')
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
