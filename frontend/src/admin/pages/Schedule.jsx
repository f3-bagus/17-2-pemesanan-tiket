import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Schedule = () => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 className="page-title">Schedule</h2>
              <div className="page-header-actions">
                <button className="btn btn-success">
                  <span class="mdi mdi-plus"></span>Add New Schedule
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Judul</th>
                            <th>Status</th>
                            <th>Actions</th> {/* Tambah kolom aksi */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Jacob</td>
                            <td>53275531</td>
                            <td>12 May 2017</td>
                            <td>
                              <label className="badge badge-danger">
                                Pending
                              </label>
                            </td>
                            <td>
                              <button className="btn btn-primary btn-sm">
                                Edit
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Delete
                              </button>
                            </td>
                          </tr>
                          {/* Data lainnya */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Schedule;
