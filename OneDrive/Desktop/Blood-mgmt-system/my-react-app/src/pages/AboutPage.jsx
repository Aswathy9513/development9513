import React from 'react';

const AboutPage = () => {
  return (
    <>
      <div className="container-fluid py-5 px-4">
        <div className="text-center mb-5">
          <h2 className="text-danger display-5">About eRaktKosh</h2>
          <h4 className="bg-light p-3 rounded mt-3 d-inline-block">
            e-RaktKosh: A Centralized Blood Bank Management System
          </h4>
        </div>

        <div className="mb-4 px-md-5">
          <p className="fw-bold text-center">
            eRaktKosh was Inaugurated on 7th April 2016 by Hon'ble Minister of Health and Family Welfare, Sh. J P Nadda.
          </p>
          <p className="text-justify">
            e-Rakt Kosh enforces Drug & Cosmetic Act, National blood policy standards and guidelines ensuring proper
            collection & donation, effective management and monitoring the quality and quantity of the donated blood.
            Considering the national roll out, e-Rakt Kosh has been developed with a modular and scalable approach with
            configurable rule-based architecture allowing customization to easily incorporate specific requirements from
            nationwide stakeholders.
          </p>
        </div>

        <div className="row px-md-5 align-items-start g-4">
          <div className="col-md-4">
            <h5 className="text-danger">Objectives</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Safe and Adequate Blood Supplies</li>
              <li className="list-group-item">Reduced Turnaround Time</li>
              <li className="list-group-item">Preventing Wastage of Blood</li>
              <li className="list-group-item">Restrict Professional Donors</li>
              <li className="list-group-item">Networking of Blood Banks</li>
              <li className="list-group-item">Donor Repository</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-danger">Salient Features</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Web Based Application</li>
              <li className="list-group-item">Aadhar Linkage</li>
              <li className="list-group-item">Decision Support</li>
              <li className="list-group-item">Enforces Guidelines</li>
              <li className="list-group-item">Dashboard</li>
              <li className="list-group-item">Statutory Reports</li>
            </ul>
          </div>

          <div className="col-md-4 text-center">
            <img
              src="/src/assets/img.png"
              alt="eRaktKosh Poster"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>

        <div className="mt-5 px-md-5">
          <h5 className="text-danger mb-3">Six Major Components of e-Rakt Kosh</h5>
          <p>
            e-Rakt Kosh has six major components for management of the blood donation life cycle:
          </p>
          <ul>
            <li>
              The biometric Donor Management System for identifying, tracking and blocking donors based on donor's health, donation history etc.
            </li>
            <li>
              It provides features such as blood grouping, TTI screening, antibody screening, component preparation etc. as per the defined processes and rules.
            </li>
            <li>
              A centralized Blood Inventory Management System for keeping track of the blood stock across numerous blood banks.
            </li>
            <li>
              Bio-Medical Waste Management System for disposal of discarded blood and other waste generated during this process.
            </li>
            <li>
              Generation of rare blood group donor registries and the generation of regular repeat donors.
            </li>
            <li>
              Alert and Notification System.
            </li>
          </ul>
        </div>
      </div>

      {/* FULL WIDTH FOOTER OUTSIDE CONTAINER */}
      <footer className="bg-dark text-light pt-5 pb-4 px-4" style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h6 className="text-danger">Looking for Blood</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Blood Availability</a></li>
                <li><a href="#" className="text-light text-decoration-none">Blood Bank Directory</a></li>
                <li><a href="#" className="text-light text-decoration-none">Thalassemia Request</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6 className="text-danger">Want to Donate Blood</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Blood Donation Camps</a></li>
                <li><a href="#" className="text-light text-decoration-none">Donor Login</a></li>
                <li><a href="#" className="text-light text-decoration-none">About Blood Donation</a></li>
                <li><a href="#" className="text-light text-decoration-none">Register VBD Camp</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6 className="text-danger">Blood Bank Login</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">eRaktkosh Login</a></li>
                <li><a href="#" className="text-light text-decoration-none">Add your Blood Bank</a></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h6 className="text-danger">About Us</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">About eRaktkosh</a></li>
                <li><a href="#" className="text-light text-decoration-none">Notifications</a></li>
                <li><a href="#" className="text-light text-decoration-none">Eraktkosh FAQs</a></li>
                <li><a href="#" className="text-light text-decoration-none">Gallery</a></li>
                <li><a href="#" className="text-light text-decoration-none">Video Gallery</a></li>
                <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-light text-decoration-none">Mobile Apps</a></li>
              </ul>
            </div>
          </div>

          <hr className="bg-light" />

          <div className="text-center small">
            <p className="mb-1">© 2016 - 2025 by Ministry of Health and Family Welfare</p>
            <p className="mb-1">® Designed and Developed by Centre for Development of Advanced Computing</p>
            <p>
              <a href="#" className="text-light text-decoration-none me-3">Terms & Conditions</a>|
              <a href="#" className="text-light text-decoration-none mx-3">Privacy Policy</a>|
              <a href="#" className="text-light text-decoration-none mx-3">Accessibility Statement</a>|
              <span className="mx-3">Last Updated : May 22 2025</span>|
              <a href="#" className="text-light text-decoration-none ms-3">Site Map</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
