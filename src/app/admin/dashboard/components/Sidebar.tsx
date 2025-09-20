"use client";

import React from "react";

type Tab = "dashboard" | "users" | "admins" | "services";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`nav-link ${
                activeTab === "dashboard" ? "active" : ""
              }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("users")}
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            >
              Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("admins")}
              className={`nav-link ${activeTab === "admins" ? "active" : ""}`}
            >
              Admins
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("services")}
              className={`nav-link ${activeTab === "services" ? "active" : ""}`}
            >
              Services
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
