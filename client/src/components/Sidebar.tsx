import { useState } from "react";
import {
  LayoutDashboard,
  GitPullRequest,
  AlertCircle,
  Settings,
  FolderGit2,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const Sidebar = () => {
  const [isExpandable, setIsExpandable] = useState<boolean>(true);

  const menuItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Pull Requests",
      href: "/pull-requests",
      icon: <GitPullRequest size={20} />,
    },
    { label: "Issues", href: "/issues", icon: <AlertCircle size={20} /> },
    {
      label: "Repositories",
      href: "/repositories",
      icon: <FolderGit2 size={20} />,
    },
    { label: "Settings", href: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`h-screen flex flex-col bg-gray-100 dark:bg-[#202124] text-black dark:text-white shadow-2xl transition-all duration-300 relative font-sans ${isExpandable ? "w-64" : "w-20"}`}
    >
      <div className="p-4 flex justify-between items-center border-[#202124] dark:border-white">
        <span
          className={`font-bold tracking-wide transition-all duration-200 overflow-hidden whitespace-nowrap ${isExpandable ? "opacity-100 w-auto" : "opacity-0 w-0"}`}
        >
          Reviews
        </span>
        <button
          onClick={() => setIsExpandable(!isExpandable)}
          className="p-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer ml-auto"
        >
          {isExpandable ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <ul className="flex-1 p-3 space-y-1 text-white">
        {menuItems.map((item, index) => (
          <li
            className="flex items-center justify-between h-12 px-3 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all duration-200 cursor-pointer group relative"
            key={index}
          >
            <div className="flex items-center min-w-24">
              {item.icon}
              <span
                className={`font-medium text-sm transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  isExpandable ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </div>

            {isExpandable && (
              <div className="w-1.5 h-1.5 rounded-full bg-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            {!isExpandable && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white text-[#5B57D1] text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 shadow-xl transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
