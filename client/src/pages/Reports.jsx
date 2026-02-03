import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [stats, setStats] = useState({ total: 0, critical: 0, resolved: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;
      setStats({
        total: data.length,
        critical: data.filter(r => r.priority === 'Critical').length,
        resolved: data.filter(r => r.status === 'Resolved').length
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">System Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-500">
          <p className="text-gray-500 uppercase text-xs font-bold">Total Requests</p>
          <p className="text-4xl font-black">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-red-500">
          <p className="text-gray-500 uppercase text-xs font-bold">Critical Issues</p>
          <p className="text-4xl font-black">{stats.critical}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-t-4 border-green-500">
          <p className="text-gray-500 uppercase text-xs font-bold">Total Resolved</p>
          <p className="text-4xl font-black">{stats.resolved}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;