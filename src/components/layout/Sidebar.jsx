import { NavLink, useNavigate } from "react-router-dom"; // useNavigate import kiya
import {
  LayoutDashboard,
  Users,
  MessageCircle,
  Mail,
  BarChart3,
  Settings,
  LogOut, // LogOut icon import kiya
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Leads Pipeline", icon: Users, path: "/leads" },
  { title: "Lead Inbox", icon: MessageCircle, path: "/whatsapp" },
  { title: "Email Automations", icon: Mail, path: "/email" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "System Settings", icon: Settings, path: "/setting" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token delete kiya
    navigate("/login"); // Login page par redirect kiya
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#020617] border-r border-slate-800 flex flex-col z-50">
      
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">C</div>
        <div className="ml-3">
          <h2 className="text-white font-bold text-lg">LeadHub</h2>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer with Logout Button */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">A</div>
            <div>
              <p className="text-sm font-medium text-white">Admin Team</p>
              <p className="text-xs text-green-400">● System Active</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}