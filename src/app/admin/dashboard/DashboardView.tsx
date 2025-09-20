"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import ServicesView from "./components/ServicesView";

interface Profile {
  id: string;
  user_name: string;
  user_email: string;
  user_number: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  link: string;
}

interface DashboardViewProps {
  user: User;
  initialUsers: Profile[];
  initialAdmins: Profile[];
  initialServices: Service[];
}

type Tab = "dashboard" | "users" | "admins" | "services";

export default function DashboardView({
  user,
  initialUsers,
  initialAdmins,
  initialServices,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header user={user} activeTab={activeTab} />
        <main className="dashboard-main">
          {activeTab === "dashboard" && (
            <DashboardStats
              userCount={initialUsers.length}
              adminCount={initialAdmins.length}
              serviceCount={initialServices.length}
            />
          )}
          {activeTab === "services" && (
            <ServicesView initialServices={initialServices} />
          )}
          {activeTab === "users" && <div>Users Table Here</div>}
          {activeTab === "admins" && <div>Admins Table Here</div>}
        </main>
      </div>
    </div>
  );
}
