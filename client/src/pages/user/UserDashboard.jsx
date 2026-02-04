import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const UserDashboard = () => {

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: "/user/dashboard",
      label: "Dashboard Home",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: "/user/doctors",
      label: "Doctors List",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      path: "/user/appointments",
      label: "My Appointments",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      path: "/user/chat",
      label: "Chat With Doctor",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  const quickActions = [
    {
      to: "/user/doctors",
      label: "Find Doctors",
      icon: "🔍",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      to: "/user/appointments",
      label: "View Appointments",
      icon: "📅",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      to: "/user/chat",
      label: "Start Chat",
      icon: "💬",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-white p-3 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex pt-16">

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:h-[calc(100vh-4rem)]
          mt-16 lg:mt-0
        `}>

          <div className="p-6">
            
            {/* User Profile Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

          </div>

        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Manage your appointments and connect with doctors
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8 border border-gray-100">
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900 truncate">{user?.email}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="font-semibold text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.to}
                  className={`
                    bg-gradient-to-br ${action.color} ${action.hoverColor}
                    text-white p-6 rounded-2xl 
                    shadow-lg hover:shadow-xl
                    transform hover:-translate-y-1
                    transition-all duration-200
                    flex flex-col items-center justify-center
                    min-h-[140px]
                  `}
                >
                  <span className="text-4xl mb-3">{action.icon}</span>
                  <span className="font-semibold text-lg text-center">
                    {action.label}
                  </span>
                </Link>
              ))}

              <button
                onClick={logout}
                className="
                  bg-gradient-to-br from-red-500 to-red-600
                  hover:from-red-600 hover:to-red-700
                  text-white p-6 rounded-2xl 
                  shadow-lg hover:shadow-xl
                  transform hover:-translate-y-1
                  transition-all duration-200
                  flex flex-col items-center justify-center
                  min-h-[140px]
                "
              >
                <span className="text-4xl mb-3">🚪</span>
                <span className="font-semibold text-lg">Logout</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;