import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'IT', urgency: 'Low', impact: 'Low' });

  const fetchUserRequests = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/requests', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(res.data);
  };

  useEffect(() => { fetchUserRequests(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/requests', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Request Submitted!");
    fetchUserRequests();
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-dark bg-primary mb-4 shadow">
        <div className="container"><span className="navbar-brand">User Dashboard</span></div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5>New Request</h5>
                <form onSubmit={handleSubmit}>
                  <input type="text" className="form-control mb-2" placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} required />
                  <textarea className="form-control mb-2" placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
                  <label className="small">Urgency</label>
                  <select className="form-select mb-2" onChange={e => setFormData({...formData, urgency: e.target.value})}>
                    <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                  </select>
                  <label className="small">Impact</label>
                  <select className="form-select mb-3" onChange={e => setFormData({...formData, impact: e.target.value})}>
                    <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                  </select>
                  <button className="btn btn-primary w-100">Submit</button>
                  <button className="btn btn-outline-light btn-sm" onClick={() => {
  localStorage.clear();
  window.location.href = "/";
}}>Logout</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>My Requests</h5>
                <table className="table table-sm mt-3">
                  <thead><tr><th>Title</th><th>Priority</th><th>Status</th></tr></thead>
                  <tbody>
                    {requests.map(r => (
                      <tr key={r.id}><td>{r.title}</td><td><span className="badge bg-info">{r.priority}</span></td><td>{r.status}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;