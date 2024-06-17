import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null); // Variabel untuk menunjukkan modal edit aktif
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        console.error("Error fetching users:", error);
      });
  };

  const handleAdd = (newUser) => {
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:3000/api/register", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User added successfully:", response.data);
        setShowAddModal(false);
        fetchUsers(); // Fetch users again to update the table
      })
      .catch((error) => {
        console.error("Failed to add user:", error);
      });
  };

  const handleEdit = (userId, updatedData) => {
    const token = sessionStorage.getItem("token");
    axios
      .put(`http://localhost:3000/api/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User edited successfully:", response.data);
        setShowEditModal(null);
        fetchUsers(); // Fetch users again to update the table
      })
      .catch((error) => {
        console.error("Failed to edit user:", error);
      });
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      return;
    }

    const token = sessionStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        fetchUsers(); // Fetch users again to update the table
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
      });
  };

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
                <button
                  className="btn btn-success"
                  onClick={() => setShowAddModal(true)}
                >
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
                            <th>Balance</th>
                            <th>Role</th>
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
                                <td>*******</td>
                                <td>{user.noHp}</td>
                                <td>{user.balance}</td>
                                <td>{user.isAdmin ? "Admin" : "User"}</td>
                                <td>
                                  <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => setShowEditModal(user)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center">
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
      <AddUserModal showModal={showAddModal} setShowModal={setShowAddModal} handleAdd={handleAdd} />
      <EditUserModal showModal={showEditModal !== null} setShowModal={setShowEditModal} handleEdit={handleEdit} user={showEditModal} />
    </div>
  );
};

export default Users;
