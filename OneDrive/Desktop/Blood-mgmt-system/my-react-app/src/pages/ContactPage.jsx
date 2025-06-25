import React from 'react';

const containerStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fafafa',
};

const footerStyle = {
  width: '100vw',
  backgroundColor: '#2c3e50',
  color: '#eee',
  padding: '40px 20px 20px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
  marginTop: '40px',
  position: 'relative',
  left: 0,
  bottom: 0,
};

const footerContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  flexWrap: 'nowrap',
};

const footerSection = {
  flex: '1',
  minWidth: '150px',
};

const footerTitle = {
  fontWeight: 'bold',
  fontSize: '16px',
  marginBottom: '12px',
  borderBottom: '1px solid #444',
  paddingBottom: '6px',
};

const footerList = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  lineHeight: '1.6',
};

const footerListItem = {
  cursor: 'default',
};

const footerBottom = {
  marginTop: '30px',
  fontSize: '12px',
  color: '#aaa',
  borderTop: '1px solid #444',
  paddingTop: '15px',
  textAlign: 'center',
  lineHeight: '1.4',
};

const linkStyle = {
  color: '#ddd',
  textDecoration: 'none',
  cursor: 'pointer',
};

const bgImageStyle = {
  width: '100vw',
  height: '300px',
  backgroundImage: 'url("/src/assets/contact.jpg")', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  marginBottom: '40px',
};

const ContactPage = () => {
  return (
    <>
      <div style={bgImageStyle}></div>

      <div
        style={{
          padding: '40px 20px',
          maxWidth: '600px',
          marginLeft: '80px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ marginBottom: '40px' }}>Contact Details</h2>

        <section style={containerStyle}>
          <h3 style={{ color: '#2c3e50' }}>
            eRaktKosh related queries, feedback and suggestions
          </h3>
          <address style={{ fontStyle: 'normal', lineHeight: 1.6, color: '#444' }}>
            <strong>Center For Development of Advanced Computing</strong>
            <br />
            C-56/1, Anusandhan Bhawan, Sector-62,
            <br />
            Noida, Uttar Pradesh - 201307
            <br />
            Phone:{' '}
            <a href="tel:+919650816031" style={{ color: '#2980b9', textDecoration: 'none' }}>
              9650816031
            </a>
            <br />
            Email:{' '}
            <a href="mailto:eraktkosh@cdac.in" style={{ color: '#2980b9', textDecoration: 'none' }}>
              eraktkosh@cdac.in
            </a>
          </address>
        </section>

        <section style={containerStyle}>
          <h3 style={{ color: '#2c3e50' }}>For Administrative queries</h3>
          <address style={{ fontStyle: 'normal', lineHeight: 1.6, color: '#444' }}>
            <strong>Blood Cell, National Health Mission</strong>
            <br />
            Ministry of Health & Family Welfare,
            <br />
            New Delhi - 110011
          </address>
        </section>
      </div>

      <footer style={footerStyle}>
        <div style={footerContainer}>
          <div style={footerSection}>
            <div style={footerTitle}>Looking for Blood</div>
            <ul style={footerList}>
              <li style={footerListItem}>Blood Availability</li>
              <li style={footerListItem}>Blood Bank Directory</li>
              <li style={footerListItem}>Thalassemia Request</li>
            </ul>
          </div>

          <div style={footerSection}>
            <div style={footerTitle}>Want to Donate Blood</div>
            <ul style={footerList}>
              <li style={footerListItem}>Blood Donation Camps</li>
              <li style={footerListItem}>Donor Login</li>
              <li style={footerListItem}>About Blood Donation</li>
              <li style={footerListItem}>Register VBD Camp</li>
            </ul>
          </div>

          <div style={footerSection}>
            <div style={footerTitle}>Blood Bank Login</div>
            <ul style={footerList}>
              <li style={footerListItem}>eRaktkosh Login</li>
              <li style={footerListItem}>Add your Blood Bank</li>
            </ul>
          </div>

          <div style={footerSection}>
            <div style={footerTitle}>About Us</div>
            <ul style={footerList}>
              <li style={footerListItem}>About eRaktkosh</li>
              <li style={footerListItem}>Notifications</li>
              <li style={footerListItem}>Eraktkosh FAQs</li>
              <li style={footerListItem}>Gallery</li>
              <li style={footerListItem}>Video Gallery</li>
              <li style={footerListItem}>Contact Us</li>
              <li style={footerListItem}>Mobile Apps</li>
            </ul>
          </div>
        </div>

        <div style={footerBottom}>
          © 2016 - 2025 by Ministry of Health and Family Welfare
          <br />
          ® Designed and Developed by Centre for Development of Advanced Computing
          <br />
          <span>
            <a href="#" style={linkStyle}>
              Terms & Conditions
            </a>{' '}
            |{' '}
            <a href="#" style={linkStyle}>
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" style={linkStyle}>
              Accessibility Statement
            </a>{' '}
            | Last Updated : May 22 2025 |{' '}
            <a href="#" style={linkStyle}>
              Site Map
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default ContactPage;
