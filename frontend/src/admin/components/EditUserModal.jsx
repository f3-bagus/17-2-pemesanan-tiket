import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserModal = ({ showModal, setShowModal, user, reloadUsers }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    noHp: "",
    balance: "",
    isAdmin: false, // Remove isAdmin from formData
  });

  useEffect(() => {
    // Set initial formData from props user
    setFormData({
      username: user.username,
      email: user.email,
      noHp: user.noHp,
      balance: user.balance,
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5750/api/users/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User updated successfully:", response.data);
      reloadUsers(); // Reload users data from server
      setShowModal(false); // Close modal after successful edit
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className={`modal ${showModal ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>No Hp</label>
                <input
                  type="text"
                  className="form-control"
                  name="noHp"
                  value={formData.noHp}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
