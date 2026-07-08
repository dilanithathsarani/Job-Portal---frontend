import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

function Dashboard() {
  return (
    <>
      <AdminSidebar />

      <div className="max-w-7xl mx-auto mt-10">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white shadow rounded p-6">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2>Total Recruiters</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2>Total Jobs</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2>Total Applications</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;
