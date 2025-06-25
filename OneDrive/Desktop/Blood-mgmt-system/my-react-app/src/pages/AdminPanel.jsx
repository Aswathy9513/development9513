

import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    document.body.style.backgroundColor = '#f1f3f5';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogout = () => {
    window.location.href = '/roles';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Admin Dashboard</h2>
            <p>Total Registered Donors: 120</p>
            <p>Current Blood Stock: 450 units</p>
            <p>Pending Requests: 7</p>
            <p>Reports Generated This Month: 3</p>
          </div>
        );
      case 'verifyDonors':
        return <h2 className="text-xl font-semibold">Verify Donors</h2>;
      case 'manageStock':
        return <h2 className="text-xl font-semibold">Manage Blood Stock</h2>;
      case 'approveRequests':
        return <h2 className="text-xl font-semibold">Approve Requests</h2>;
      case 'generateReports':
        return <h2 className="text-xl font-semibold">Generate Reports</h2>;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'verifyDonors', label: 'Verify Donors' },
    { id: 'manageStock', label: 'Manage Blood Stock' },
    { id: 'approveRequests', label: 'Approve Requests' },
    { id: 'generateReports', label: 'Generate Reports' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <nav
        style={{
          width: '260px',
          height: '100%', // ← This line ensures logout is pushed to the bottom
          backgroundColor: '#0d3b66',
          padding: '2rem 1rem',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ marginBottom: '2rem', fontSize: '1.6rem', color: '#ff6f91' }}>Admin Panel</h1>

        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              backgroundColor: activeTab === id ? '#ff6f91' : 'transparent',
              color: '#fff',
              border: 'none',
              padding: '12px 16px',
              marginBottom: '10px',
              textAlign: 'left',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== id) {
                e.target.style.backgroundColor = '#144270';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {label}
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'transparent',
            color: '#ff4d6d',
            border: 'none',
            padding: '12px 16px',
            marginTop: 'auto',
            textAlign: 'left',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ff4d6d';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ff4d6d';
          }}
        >
          Logout
        </button>
      </nav>

      <main
        style={{
          flexGrow: 1,
          backgroundColor: '#fff',
          padding: '2rem 3rem',
          overflowY: 'auto',
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

