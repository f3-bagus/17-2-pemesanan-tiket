import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Users = () => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 className="page-title">Users</h2>
              <div className="page-header-actions">
                <button className="btn btn-success">
                  <span class="mdi mdi-plus"></span>Add New Users
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>No Hp</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Jacob Prasojo</td>
                            <td>jacobp</td>
                            <td>jacob@gmail.com</td>
                            <td>*******</td>
                            <td>0821637126</td>
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

export default Users;
