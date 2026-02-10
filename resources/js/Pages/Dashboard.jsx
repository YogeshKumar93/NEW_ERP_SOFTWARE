import React from "react";
import AppLayout from "../../Layouts/AppLayout";

const Dashboard = () => {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">Cash Balance: ₹50,000</div>
        <div className="bg-white p-4 shadow rounded">Bank Balance: ₹2,00,000</div>
        <div className="bg-white p-4 shadow rounded">Today Sales: ₹75,000</div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
