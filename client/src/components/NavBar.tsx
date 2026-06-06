import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
}

const navItems: NavItem[] = [
  { label: "Home" },
  { label: "About Us" },
  { label: "Contact Us" },
];

const NavBar = () => {
  const [isLoggedIn , setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setLoggedIn(true);
    }
  },[])
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  
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
                 Examples
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
          <div className="relative group">

            {isLoggedIn ? (<div>
              <Button className="border-2 rounded-lg hover:text-black" title="Harshit" size="md" variant="secondary" />

              {/* Profile Drop */}
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                <div className="px-4 py-3 text-sm border-b border-gray-100">
                  <span className="block text-gray-900 font-medium">Harshit</span>
                  <span className="block text-gray-500 truncate tex-xs">harshitsingh@gmail.com</span>
                </div>
                <ul className="p-1 text-sm text-gray-700 font-medium">
                    <li>
                      <a href="/dashboard" className="flex items-center w-full p-2 hover:bg-gray-100 rounded">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/settings" className="flex items-center w-full p-2 hover:bg-gray-100 rounded">
                        Settings
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center w-full p-2 hover:bg-gray-100 rounded text-left text-red-600"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
              </div>
              </div>) : (<Button className="border-2 shadow-lg"
            title="Login"
            size="md"
            variant="secondary"
            onClick={() => {
              navigate('/signin')
            }}
          />)}

          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
