import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EditUserModal from "../components/EditUserModal";
import AddUserModal from "../components/AddUserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(15); // Jumlah pengguna per halaman

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out users with isAdmin === true
      const filteredUsers = response.data.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reloadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const reloadUsers = () => {
    fetchUsers();
  };

  // Menghitung indeks pengguna pada halaman saat ini
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Menentukan data pengguna yang akan ditampilkan pada halaman saat ini
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                            <th>No.</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>No Hp</th>
                            <th>Balance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                              <td>{indexOfFirstUser + index + 1}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.noHp}</td>
                              <td>{user.balance}</td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm mr-2"
                                  onClick={() => handleEdit(user)}
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
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination */}
                    <div className="d-flex justify-content-center">
                      <Pagination>
                        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
                          <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                            {number + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* EditUserModal */}
      {selectedUser && (
        <EditUserModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          user={selectedUser}
          reloadUsers={reloadUsers}
        />
      )}

      {/* AddUserModal */}
      <AddUserModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        reloadUsers={reloadUsers}
      />
    </div>
  );
};

export default Users;
