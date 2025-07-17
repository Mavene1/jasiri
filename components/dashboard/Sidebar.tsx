"use client";

import React, { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  Users,
  Settings,
  HelpCircle,
  Zap,
  CheckCircle,
  PanelLeftOpen,
  PanelLeftClose,
  ExternalLink,
  User,
} from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { logoutAction } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  // const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);

  const handleLogout = async () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result.success) {
        logout(); // clear Zustand
        router.push('/signin');
      } else {
        setErrorMsg(result.message);
      }
    });
  };

  const mainNavItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
    // { icon: <Calendar size={18} />, label: "Messages", href: "/messages" },
    // { icon: <FileText size={18} />, label: "Systems", href: "/systems" },
    // { icon: <Package size={18} />, label: "Products", href: "/products" },
    { icon: <PieChart size={18} />, label: "Reports", href: "/dashboard/reports" },
    { icon: <User size={18} />, label: "My-Profile", href: "/dashboard/profile" },
  ];

  const isActive = (path: string) => pathname === path;

  const menuRef = useRef<HTMLDivElement>(null);
  // useClickOutside(menuRef, () => setShowProfileMenu(false));

  return (
    <div
      className={`flex flex-col h-screen ${isCollapsed ? "w-24" : "w-54"
        } bg-white border-r border-[#E3F2FD] transition-all duration-300 relative`}
    >
      {/* App Logo/Name */}
      <div className="pr-2 pl-3 py-4 flex items-center justify-between border-b border-[#E3F2FD]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-8 bg-[#2CB34A] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Jasiri</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-gray-800">Observatory</span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-[#E3F2FD] rounded-lg transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={18} className="text-gray-600" />
          ) : (
            <PanelLeftClose size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 space-y-2">
        {/* <div
          className={`flex items-center gap-2 px-3 py-2 bg-[#E3F2FD] text-[#2CB34A] rounded-lg ${isCollapsed ? "justify-center" : ""
            }`}
        >
          <CheckCircle size={18} />
          {!isCollapsed && (
            <>
              <span className="font-medium">Forum</span>
              <span className="ml-auto bg-[#2CB34A] text-white px-2 py-0.5 rounded-full text-sm">
                16
              </span>
            </>
          )}
        </div> */}
        <Link
          key={"/dashboard/forum"}
          href="/dashboard/forum"
          className={`flex items-center gap-2 px-3 py-2 pl-6 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
            }${isActive("/dashboard/forum")
              ? "bg-[#E3F2FD] text-[#2CB34A]"
              : "text-gray-700 hover:bg-[#E3F2FD]"
            }`}
          title={isCollapsed ? "Forum" : ""}
        >
          <CheckCircle size={18} />
          {!isCollapsed && (
            <>
              <span>Forum</span>
              <span className="ml-auto bg-[#2CB34A] text-white px-2 py-0.5 rounded-full text-sm">
                16
              </span>
              {isActive("/dashboard/forum") && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
              )}
            </>
          )}
        </Link>
        <Link
          key={"/dashboard/activities"}
          href="/dashboard/activities"
          className={`flex items-center gap-2 px-3 py-2 pl-6 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
            }${isActive("/dashboard/activities") || pathname.startsWith("/dashboard/activities")
              ? "bg-[#E3F2FD] text-[#2CB34A]"
              : "text-gray-700 hover:bg-[#E3F2FD]"
            }`}
          title={isCollapsed ? "Activities" : ""}
        >
          <Zap size={18} />
          {!isCollapsed && (
            <>
              <span>Activities</span>
              {isActive("/dashboard/activities") || pathname.startsWith("/dashboard/activities") ? (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
              ) : ""}
            </>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-2">
        {!isCollapsed && (
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
            Main
          </p>
        )}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2  rounded-lg cursor-pointer transition-colors
                ${isCollapsed ? "justify-center" : "pl-6"}
                ${isActive(item.href)
                  ? "bg-[#E3F2FD] text-[#2CB34A]"
                  : "text-gray-700 hover:bg-[#E3F2FD]"
                }`}
              title={isCollapsed ? item.label : ""}
            >
              {item.icon}
              {!isCollapsed && (
                <>
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Records Section */}
      <div className="px-3 py-5">
        {!isCollapsed && (
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
            Records
          </p>
        )}
        <nav className="space-y-1">
          <Link
            key="/dashboard/users"
            href="/dashboard/users"
            className={`flex items-center gap-2 px-3 py-2 pl-6 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
              }${isActive("/dashboard/users")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
              }`}
          >
            <Users size={18} />
            {!isCollapsed && (
              <>
                <span>Users</span>
                {isActive("/dashboard/users") && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
                )}
              </>
            )}
          </Link>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto">
        <nav className="p-3 space-y-1">
          <Link
            key="/dashboard/settings"
            href="/dashboard/settings"
            className={`flex items-center gap-2 px-3 py-2 pl-6 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
              }${isActive("/dashboard/settings")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
              }`}
          >
            <Settings size={18} />
            {!isCollapsed && (
              <>
                <span>Settings</span>
                {isActive("/dashboard/settings") && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
                )}
              </>
            )}
          </Link>
          <Link
            key="/dashboard/support"
            href="/dashboard/support"
            className={`flex items-center gap-2 px-3 py-2 pl-6 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
              }${isActive("/dashboard/support")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
              }`}
          >
            <HelpCircle size={18} />
            {!isCollapsed && (
              <>
                <span>Support</span>
                {isActive("/dashboard/support") && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
                )}
              </>
            )}
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-[#E3F2FD] relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center gap-3 px-3 py-2 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${isCollapsed ? "justify-center" : ""
              }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
              <span className="text-sm font-medium text-[#2CB34A]">MO</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">@{user?.email}</p>
              </div>
            )}
          </div>

          {/* Profile Menu Popup */}
          {showProfileMenu && (
            <div
              ref={menuRef}
              className="absolute bottom-full left-3 z-10 mb-2 w-54 bg-gray-50 text-gray-700 rounded-lg shadow-lg border border-gray-300 py-2"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium">{user?.name}</p>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] flex items-center gap-2">
                  <span>Personal</span>
                  <span className="ml-auto text-xs text-[#2CB34A]">
                    Free plan
                  </span>
                </button>
              </div>

              <div className="border-t border-gray-100 py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD]">
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD]">
                  Appearance
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD]">
                  Feature Preview
                </button>
              </div>

              <div className="border-t border-gray-100 py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD]">
                  Learn more
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] flex items-center gap-2">
                  Get help
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] flex items-center gap-2">
                  Help Center
                  <ExternalLink size={14} className="ml-auto" />
                </button>
              </div>

              {errorMsg && (
                <div className="border-t border-gray-100 py-2">
                  <p className="text-sm text-red-600">{errorMsg}</p>
                </div>
              )}

              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] text-red-600 cursor-pointer"
                >
                  {isPending ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
