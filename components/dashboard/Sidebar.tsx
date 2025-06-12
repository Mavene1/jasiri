"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Package,
  PieChart,
  Users,
  // UserCircle,
  Settings,
  HelpCircle,
  // ChevronDown,
  Zap,
  CheckCircle,
  PanelLeftOpen,
  PanelLeftClose,
  ExternalLink,
} from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

const Sidebar = () => {
  // const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
// Then call logout() when needed

  const mainNavItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/" },
    // { icon: <Calendar size={18} />, label: "Messages", href: "/messages" },
    // { icon: <FileText size={18} />, label: "Systems", href: "/systems" },
    // { icon: <Package size={18} />, label: "Products", href: "/products" },
    { icon: <PieChart size={18} />, label: "Reports", href: "/reports" },
  ];

  const isActive = (path: string) => pathname === path;

  const menuRef = useRef<HTMLDivElement>(null);
  // useClickOutside(menuRef, () => setShowProfileMenu(false));

  return (
    <div
      className={`flex flex-col h-screen ${
        isCollapsed ? "w-24" : "w-54"
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
          className="p-1.5 hover:bg-[#E3F2FD] rounded-lg transition-colors"
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
          className={`flex items-center gap-2 px-3 py-2 bg-[#E3F2FD] text-[#2CB34A] rounded-lg ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <CheckCircle size={18} />
          {!isCollapsed && (
            <>
              <span className="font-medium">Tasks</span>
              <span className="ml-auto bg-[#2CB34A] text-white px-2 py-0.5 rounded-full text-sm">
                16
              </span>
            </>
          )}
        </div> */}
        <Link
          key={"/tasks"}
          href="/tasks"
          className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }${
            isActive("/tasks")
              ? "bg-[#E3F2FD] text-[#2CB34A]"
              : "text-gray-700 hover:bg-[#E3F2FD]"
          }`}
          title={isCollapsed ? "Tasks" : ""}
        >
          <CheckCircle size={18} />
          {!isCollapsed && (
            <>
              <span>Tasks</span>
              <span className="ml-auto bg-[#2CB34A] text-white px-2 py-0.5 rounded-full text-sm">
                16
              </span>
              {isActive("/tasks") && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
              )}
            </>
          )}
        </Link>
        <Link
          key={"/activities"}
          href="/activities"
          className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
            isCollapsed ? "justify-center" : ""
          }${
            isActive("/activities")
              ? "bg-[#E3F2FD] text-[#2CB34A]"
              : "text-gray-700 hover:bg-[#E3F2FD]"
          }`}
          title={isCollapsed ? "Activities" : ""}
        >
          <Zap size={18} />
          {!isCollapsed && (
            <>
              <span>Activities</span>
              {isActive("/activities") && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
              )}
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors
                ${isCollapsed ? "justify-center" : ""}
                ${
                  isActive(item.href)
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
            key="/team"
            href="/team"
            className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }${
              isActive("/team")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
            }`}
          >
            <Users size={18} />
            {!isCollapsed && (
              <>
                <span>Team</span>
                {isActive("/team") && (
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
            key="/settings"
            href="/settings"
            className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }${
              isActive("/settings")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
            }`}
          >
            <Settings size={18} />
            {!isCollapsed && (
              <>
                <span>Settings</span>
                {isActive("/settings") && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2CB34A]" />
                )}
              </>
            )}
          </Link>
          <Link
            key="/support"
            href="/support"
            className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }${
              isActive("/support")
                ? "bg-[#E3F2FD] text-[#2CB34A]"
                : "text-gray-700 hover:bg-[#E3F2FD]"
            }`}
          >
            <HelpCircle size={18} />
            {!isCollapsed && (
              <>
                <span>Support</span>
                {isActive("/support") && (
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
            className={`flex items-center gap-3 px-3 py-2 hover:bg-[#E3F2FD] rounded-lg cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
              <span className="text-sm font-medium text-[#2CB34A]">BS</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">@{"Mavene"}</p>
              </div>
            )}
          </div>

          {/* Profile Menu Popup */}
          {showProfileMenu && (
            <div
              ref={menuRef}
              className="absolute bottom-full left-3 z-10 mb-2 w-54 bg-gray-300 rounded-lg shadow-lg border border-gray-100 py-2"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium">{user?.username}</p>
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

              <div className="border-t border-gray-100 py-2">
                <button
                  // onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-[#E3F2FD] text-red-600"
                >
                  Log Out
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
