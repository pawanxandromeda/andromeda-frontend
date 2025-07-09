import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, DollarSign, Settings, MessageCircle, Briefcase, ChevronLeft, Instagram, HelpCircle, LucideBadgeHelp, BadgeDollarSignIcon, CircleDollarSignIcon, Train, BicepsFlexed, Settings2Icon, LucideSettings, LucideLayoutDashboard } from "lucide-react";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate("/login");
  };

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const navItems = [
    { to: "/dashboard", icon: LucideLayoutDashboard, label: "Dashboard" },
    { to: "/business-setup", icon: Briefcase, label: "Business Setup" },
    { to: "/train-ai", icon: BicepsFlexed, label: "Train Bot" },
    { to: "/pricing", icon: CircleDollarSignIcon, label: "Plans/Subscription" },
      { to: "/settings", icon: LucideSettings, label: "Settings" },
    { to: "/feedback", icon: LucideBadgeHelp, label: "Feedback & Support" },
  
  ];

  return (
    <motion.nav
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-50 flex flex-col border-r border-gray-700/50"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50 backdrop-blur-xl bg-gray-900/30">
        <div className="flex items-center">
          <div className="relative">
            <Instagram className="w-8 h-8 text-pink-500" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="ml-3 text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              >
                Mastergram.ai
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-700/50 space-y-4 backdrop-blur-xl bg-gray-900/30">
        <button
          onClick={handleSignOut}
          className={`w-full flex items-center justify-center p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 group ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <LogOut className="w-6 h-6 text-red-400" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-medium text-red-400"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
        >
          <ChevronLeft
            className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </motion.nav>
  );
};

const NavItem = ({ to, icon: Icon, label, isActive, isCollapsed }) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center px-6 py-3 transition-all duration-300 group ${
        isActive
          ? "text-white bg-gray-800/50 backdrop-blur-lg"
          : "text-gray-400 hover:text-white hover:bg-gray-800/30"
      }`}
    >
      <div className="flex items-center">
        <Icon className={`w-6 h-6 transition-transform duration-300 ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
        }`} />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-4 font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 rounded-r"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </Link>
  );
};

export default Navbar;