import React from "react";

interface DashboardStatsProps {
  userCount: number;
  adminCount: number;
  serviceCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  userCount,
  adminCount,
  serviceCount,
}) => {
  return (
    <div id="dashboard-home" className="dashboard-section active">
      <h2 className="section-title">Statistics</h2>
      <section className="stats-section">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Admins</h3>
          <p>{adminCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Services</h3>
          <p>{serviceCount}</p>
        </div>
      </section>
    </div>
  );
};

export default DashboardStats;
