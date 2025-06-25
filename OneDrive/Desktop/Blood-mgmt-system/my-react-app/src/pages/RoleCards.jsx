import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    switch (role) {
      case 'donor':
        navigate('/donordash');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'recipient':
        navigate('/recpdash');
        break;
      default:
        break;
    }
  };

  const roles = [
    {
      title: 'Donor',
      description: 'Donate blood and save lives.',
      color: 'primary',
      image: '/src/assets/donor-card.jpeg',
    },
    {
      title: 'Admin',
      description: 'Manage users and donations.',
      color: 'success',
      image: '/src/assets/admin-card.jpg',
    },
    {
      title: 'Recipient',
      description: 'Request and receive blood.',
      color: 'danger',
      image: '/src/assets/recipient-card.png',
    },
  ];

  return (
    <div className="container-fluid my-5 px-4">
      <div className="d-flex justify-content-start flex-wrap gap-4">
        {roles.map((role, index) => (
          <div
            key={role.title}
            className="card shadow-lg"
            style={{
              cursor: 'pointer',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: index === 3 ? '3rem' : '8rem',
            }}
            onClick={() => handleCardClick(role.title.toLowerCase())}
          >
            <img
              src={role.image}
              className="card-img-top"
              alt={`${role.title} illustration`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '200px',
                objectFit: 'contain', // maintain aspect ratio, no cropping
              }}
            />
            <div className="card-body d-flex flex-column text-center">
              <h5 className={`card-title text-${role.color}`}>{role.title}</h5>
              <p className="card-text">{role.description}</p>
              <div className="mt-auto">
                <button
                  className={`btn btn-${role.color} w-100`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(role.title.toLowerCase());
                  }}
                >
                  Go to {role.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleCards;
