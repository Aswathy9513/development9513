import React, { useState, useEffect } from 'react';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('bloodInfo');

  useEffect(() => {
    document.body.style.backgroundColor = '#e9ecef';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogout = () => {
    window.location.href = '/roles'; 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bloodInfo':
        return (
          <div>
            <h2 className="mb-4" style={{ color: '#212529' }}>Blood Donation Info</h2>
            <p style={{ fontSize: '1.2rem', color: '#212529' }}>
              <strong>Blood Type:</strong> A+
            </p>
            <p style={{ fontSize: '1.2rem', color: '#212529' }}>
              <strong>Availability:</strong> Available for donation
            </p>
          </div>
        );
      case 'setLocation':
        return (
          <div>
            <h2 className="mb-4" style={{ color: '#212529' }}>Set Location</h2>
            <p style={{ fontSize: '1.2rem', color: '#212529' }}>Set your preferred donation location here.</p>
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2 className="mb-4" style={{ color: '#212529' }}>View/Edit Profile</h2>
            <p style={{ fontSize: '1.2rem', color: '#212529' }}>Edit your profile information here.</p>
          </div>
        );
      case 'donationHistory':
        return (
          <div>
            <h2 className="mb-4" style={{ color: '#212529' }}>View Donation History</h2>
            <p style={{ fontSize: '1.2rem', color: '#212529' }}>List of your past donations.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <nav
        style={{
          width: '280px',
          backgroundColor: '#0d3b66', 
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1.5rem',
          color: '#f8f9fa', 
        }}
      >
        <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#ffc107' }}>Donor Panel</h1>

        {[
          { id: 'bloodInfo', label: 'Blood Donation Info' },
          { id: 'setLocation', label: 'Set Location' },
          { id: 'profile', label: 'View/Edit Profile' },
          { id: 'donationHistory', label: 'View Donation History' },
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
              if (activeTab !== id) e.target.style.backgroundColor = '#1a5299'; 
            }}
            onMouseLeave={e => {
              if (activeTab !== id) e.target.style.backgroundColor = 'transparent';
            }}
          >
            {label}
          </button>
        ))}

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

      <main
        style={{
          flexGrow: 1,
          padding: '3rem 4rem',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa', 
          color: '#212529',
          borderRadius: '0 0 0 12px',
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default DonorDashboard;
