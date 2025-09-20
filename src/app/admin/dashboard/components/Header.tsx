import React from "react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/actions";

interface HeaderProps {
  user: User;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ user, activeTab }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
      </div>
      <div className="header-right">
        <span>Welcome, {user.email}!</span>
        <form action={signOut}>
          <button type="submit" className="logout-btn">
            Logout
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
