import React from 'react';

const HomePage = () => {
  return (
    <div>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div
          style={{
            display: 'inline-block',
            paddingLeft: '100%',
            animation: 'marquee 15s linear infinite',
            color: 'red',
            fontWeight: 'bold',
            fontSize: '18px',
            marginTop: '80px',
          }}
        >
          Donate Blood, Save Lives! Become a Hero Today! | Join Our Next Blood Donation Camp Now!
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }

          /* Hover Effect for Cards */
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          /* Fixed Image Size for Cards */
          .card-img-top {
            width: 100%;  /* Ensure image takes up full width of the card */
            height: 150px;  /* Fixed height for the image */
            object-fit: contain;  /* Ensure the image fits without cropping */
          }
        `}
      </style>

      <h1 className="text-center my-4 text-danger">
        Welcome to Blood Management System
      </h1>

      <div
        id="bloodCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        style={{ width: '100vw', overflowX: 'hidden' }}
      >
        <div className="carousel-inner">
          {['carosel-1.jpg', 'carosel-2.jpg', 'carosel-3.jpg', 'carosel-4.jpg'].map((img, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={img}>
              <img
                src={`/src/assets/${img}`}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#bloodCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bloodCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mb-5">
        <div className="row g-4">
          {[
            {
              img: '/src/assets/card-1.png',
              title: 'Why Donate Blood?',
              text: 'A single donation can save up to three lives. Your contribution is vital to patients in need.',
            },
            {
              img: '/src/assets/card-2.jpg',
              title: 'Become a Donor',
              text: 'Join our growing community of voluntary blood donors and help build a healthier future.',
            },
            {
              img: '/src/assets/card-3.jpg',
              title: 'Organize a Blood Camp',
              text: 'Collaborate with us to organize blood donation drives in your locality or institution.',
            },
            {
              img: '/src/assets/card-4.jpg',
              title: 'Who Needs Blood?',
              text: 'Cancer patients, accident victims, and people undergoing surgery need regular blood transfusions.',
            },
          ].map((card, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="card h-100 shadow-sm">
                <img
                  src={card.img}
                  className="card-img-top"
                  alt={card.title}
                />
                <div className="card-body">
                  <h5 className="card-title text-danger">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Donate Blood To</th>
                  <th>Receive Blood From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A+</td>
                  <td>A+, AB+</td>
                  <td>A+, A-, O+, O-</td>
                </tr>
                <tr>
                  <td>O+</td>
                  <td>O+, A+, B+, AB+</td>
                  <td>O+, O-</td>
                </tr>
                <tr>
                  <td>B+</td>
                  <td>B+, AB+</td>
                  <td>B+, B-, O+, O-</td>
                </tr>
                <tr>
                  <td>AB+</td>
                  <td>AB+</td>
                  <td>Everyone</td>
                </tr>
                <tr>
                  <td>A-</td>
                  <td>A+, A-, AB+, AB-</td>
                  <td>A-, O-</td>
                </tr>
                <tr>
                  <td>O-</td>
                  <td>Everyone</td>
                  <td>O-</td>
                </tr>
                <tr>
                  <td>B-</td>
                  <td>B+, B-, AB+, AB-</td>
                  <td>B-, O-</td>
                </tr>
                <tr>
                  <td>AB-</td>
                  <td>AB+, AB-</td>
                  <td>AB-, A-, B-, O-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <img
              src="/src/assets/blood-donation.webp"
              alt="Blood Donation"
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h3 className="text-center">Types of Donation</h3>
        <p>
          The average human body contains about five liters of blood, which is made of several cellular and non-cellular components such as Red blood cell, Platelet, and Plasma.
          Each type of component has its unique properties and can be used for different indications. The donated blood is separated into these components by the blood center, and one donated unit can save up to four lives depending on the number of components separated from your blood.
        </p>
        <ul>
          <li><strong>Packed Red Blood cells</strong></li>
          <li><strong>Plasma</strong></li>
          <li><strong>Platelet</strong></li>
        </ul>

        <h5>What is it?</h5>
        <p>
          Blood collected straight from the donor into a blood bag and mixed with an anticoagulant is called whole blood. This collected whole blood is then centrifuged, and red cell, platelets, and plasma are separated. The separated red cells are mixed with a preservative to be called packed red blood cells.
        </p>

        <h5>Who can donate?</h5>
        <p>You need to be 18-65 years old, weigh 45kg or more, and be fit and healthy.</p>

        <h5>User For?</h5>
        <p>Correction of severe anemia in a number of conditions and blood loss in case of childbirth, surgery, or trauma settings.</p>

        <h5>Lasts For?</h5>
        <p>Red cells can be stored for 42 days at 2-6°C.</p>

        <h5>How long does it take to donate?</h5>
        <p>15-30 minutes to donate, including the pre-donation check-up.</p>

        <h5>How often can I donate?</h5>
        <p>Male donors can donate again after 90 days and female donors after 120 days.</p>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Looking for Blood</h5>
              <ul>
                <li>Blood Availability</li>
                <li>Blood Bank Directory</li>
                <li>Thalassemia Request</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Want to Donate Blood</h5>
              <ul>
                <li>Blood Donation Camps</li>
                <li>Donor Login</li>
                <li>About Blood Donation</li>
                <li>Register VBD Camp</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Blood Bank Login</h5>
              <ul>
                <li>eRaktkosh Login</li>
                <li>Add your Blood Bank</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>About Us</h5>
              <ul>
                <li>About eRaktkosh</li>
                <li>Notifications</li>
                <li>eRaktkosh FAQs</li>
                <li>Gallery</li>
                <li>Video Gallery</li>
                <li>Contact Us</li>
                <li>Mobile Apps</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-3">
          <p>&copy; 2016 - 2025 by Ministry of Health and Family Welfare</p>
          <p>Designed and Developed by Centre for Development of Advanced Computing</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
