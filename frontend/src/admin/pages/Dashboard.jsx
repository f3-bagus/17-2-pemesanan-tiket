import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../css/style.css"


const Dashboard = () => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">10</h3>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-warning ">
                          <span className="mdi mdi-calendar-month"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">Schedule</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">10</h3>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-danger">
                          <span className="mdi mdi-movie icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">Movie</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">10</h3>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="icon icon-box-primary">
                          <span className="mdi mdi-account icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-muted font-weight-normal">Users</h6>
                  </div>
                </div>
              </div>
            </div>
            {/* Other rows and columns go here */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
