import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) { console.error("Fetch error", err); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/requests/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Status Updated!");
    fetchRequests();
  };

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container"><span className="navbar-brand">Admin Control Panel</span></div>
      </nav>
      <div className="container">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white font-weight-bold">Active Service Requests</div>
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Issue</th><th>Priority</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id}>
                    <td><strong>{req.title}</strong><br/><small>{req.category}</small></td>
                    <td><span className={`badge ${req.priority === 'Critical' ? 'bg-danger' : 'bg-warning text-dark'}`}>{req.priority}</span></td>
                    <td>{req.status}</td>
                    <td>
                      <select className="form-select form-select-sm" onChange={(e) => updateStatus(req.id, e.target.value)}>
                        <option value="">Update...</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;