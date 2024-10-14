import { useState } from "react";
import { FaBars, FaSignOutAlt, FaHome, FaCog, FaUser } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "#", icon: FaHome, current: true },
  { name: "Profile", href: "#", icon: FaUser, current: false },
  { name: "Settings", href: "#", icon: FaCog, current: false },
];

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const togglePopover = () => {
    setProfilePopoverOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40 md:hidden">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FiX className="h-6 w-6 text-black" />
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4 mt-5">
                <h1>Destion Innovations</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
              <h1 className="text-xl text-white font-bold">
                Destion Innovations
              </h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
               
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 md:pl-64">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center">
                <div className="ml-3 relative">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-8 w-8 rounded-full cursor-pointer"
                      src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                      alt=""
                      onClick={togglePopover}
                    />
                    <p className="text-sm font-medium text-gray-900">{user}</p>
                  </div>
                  {profilePopoverOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <div className="flex items-center gap-2  py-2 px-10 hover:bg-gray-100">
                      <FaSignOutAlt className=" h-6 w-6 text-rose-600" aria-hidden="true" />
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-rose-700  w-full text-left"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Welcome, {user}!
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
