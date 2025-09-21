"use client";

import React from "react";

type Tab = "dashboard" | "users" | "services";

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
              <span>🏠</span> <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("users")}
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            >
              <span>👥</span> <span>Users</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("services")}
              className={`nav-link ${activeTab === "services" ? "active" : ""}`}
            >
              <span>🔧</span> <span>Services</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
