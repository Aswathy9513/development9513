import React, { useState, useEffect } from 'react';

const RecipientDashboard = () => {
  const [activeTab, setActiveTab] = useState('searchBlood');

  useEffect(() => {
    document.body.style.backgroundColor = '#e9ecef';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogout = () => {
    window.location.href = '/roles'; // Instantly navigate to roles page
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'searchBlood':
        return (
          <div>
            <h2 className="mb-4">Search Blood</h2>
            <p>Search blood by type and location.</p>
          </div>
        );
      case 'requestBlood':
        return (
          <div>
            <h2 className="mb-4">Request Blood</h2>
            <p>Fill the form to request blood.</p>
          </div>
        );
      case 'status':
        return (
          <div>
            <h2 className="mb-4">Blood Request Status</h2>
            <p>Track your current blood request status.</p>
          </div>
        );
      case 'history':
        return (
          <div>
            <h2 className="mb-4">Request History</h2>
            <p>View your previous blood requests.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Left Sidebar */}
      <nav
        style={{
          width: '260px',
          backgroundColor: '#0d3b66', // Dark Blue
          borderRight: '1px solid #ccc',
          padding: '2rem 1.5rem',
          fontFamily: 'Segoe UI, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
<h1
  style={{
    marginBottom: '2rem',
    color: '#f8f9fa',
    whiteSpace: 'nowrap',   // Prevent line break
    fontWeight: '700',
    fontSize: '1.8rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }}
>
  Recipient Panel
</h1>

        {[
          { id: 'searchBlood', label: 'Search Blood' },
          { id: 'requestBlood', label: 'Request Blood' },
          { id: 'status', label: 'Request Status' },
          { id: 'history', label: 'Request History' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              backgroundColor: activeTab === id ? '#ffc107' : 'transparent',
              color: activeTab === id ? '#0d3b66' : '#f8f9fa',
              border: 'none',
              padding: '12px 18px',
              marginBottom: '12px',
              textAlign: 'left',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: activeTab === id ? '600' : '500',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => {
              if (activeTab !== id) {
                e.target.style.backgroundColor = '#1a5299';
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {label}
          </button>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            backgroundColor: 'transparent',
            color: '#ff6b6b',
            border: 'none',
            padding: '12px 18px',
            textAlign: 'left',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '500',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#b33939';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ff6b6b';
          }}
        >
          Logout
        </button>
      </nav>

      {/* Right Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: '3rem 4rem',
          backgroundColor: '#f8f9fa', // Light Grey
          overflowY: 'auto',
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default RecipientDashboard;
