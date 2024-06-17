import React, { useState } from "react";

const AddUserModal = ({ showModal, setShowModal, handleAdd }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noHp, setNoHp] = useState("");
  const [balance, setBalance] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = { username, email, password, noHp, balance, isAdmin };
    handleAdd(userData);
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setNoHp("");
    setBalance(0);
    setIsAdmin(false);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New User</h5>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>No HP</label>
                <input type="text" className="form-control" value={noHp} onChange={(e) => setNoHp(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Balance</label>
                <input type="number" className="form-control" value={balance} onChange={(e) => setBalance(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select className="form-control" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
                  <option value={false}>User</option>
                  <option value={true}>Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="submit" className="btn btn-primary">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
