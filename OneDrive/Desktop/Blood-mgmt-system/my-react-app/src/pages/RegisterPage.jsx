import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!role) {
      alert('Please select a role');
      return;
    }

    if (!bloodGroup) {
      alert('Please select a blood group');
      return;
    }

    alert('Registered successfully! Now login.');
    navigate('/');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <div
        className="bg-white rounded shadow p-4"
        style={{
          width: '100%',
          maxWidth: '700px',
        }}
      >
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" className="form-control" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-control" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-control" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="tel" id="mobile" className="form-control" pattern="[0-9]{10}" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="place" className="form-label">Place</label>
              <input type="text" id="place" className="form-control" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea id="address" className="form-control" rows="1" required />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
              <select
                id="bloodGroup"
                className="form-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="admin">Admin</option>
                <option value="doctor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">Register</button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate('/login')}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
