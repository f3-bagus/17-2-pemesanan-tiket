import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ambil token dari session storage
    const token = sessionStorage.getItem("token");

    // Lakukan request GET ke API
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data); // Set data pengguna ke state
      })
      .catch((error) => {
        setError("Failed to fetch users");
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper bg-black">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 className="page-title">Users</h2>
              <div className="page-header-actions">
                <button className="btn btn-success">
                  <span className="mdi mdi-plus"></span> Add New User
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card rounded shadow border-0">
                  <div className="card-body p-5 bg-dark rounded">
                    <div className="table-responsive">
                      <table className="table table-striped table-dark">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>No Hp</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 ? (
                            users.map((user, index) => (
                              <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>*******</td> {/* Jangan tampilkan password asli */}
                                <td>{user.noHp}</td>
                                <td>
                                  <button className="btn btn-warning btn-sm">
                                    Edit
                                  </button>
                                  <button className="btn btn-danger btn-sm">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                {error || "Loading..."}
                              </td>
                            </tr>
                          )}
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
    </div>
  );
};

export default Users;
