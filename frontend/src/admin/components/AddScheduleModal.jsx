import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const AddScheduleModal = ({ showModal, setShowModal, handleAdd, handleEdit, editSchedule }) => {
  const [date, setDate] = useState(moment().tz("Asia/Jakarta").format("YYYY-MM-DD"));
  const [showTimes, setShowTimes] = useState([""]);

  useEffect(() => {
    if (editSchedule) {
      setDate(editSchedule.date);
      setShowTimes(editSchedule.showTimes);
    }
  }, [editSchedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSchedule) {
      handleEdit({ _id: editSchedule._id, date, showTimes });
    } else {
      handleAdd({ date, showTimes });
    }
  };

  const handleAddShowTime = () => {
    setShowTimes([...showTimes, ""]);
  };

  const handleShowTimeChange = (index, value) => {
    const newShowTimes = [...showTimes];
    newShowTimes[index] = value;
    setShowTimes(newShowTimes);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editSchedule ? "Edit Schedule" : "Add New Schedule"}</h5>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Show Times</label>
                {showTimes.map((showTime, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    value={showTime}
                    onChange={(e) => handleShowTimeChange(index, e.target.value)}
                    placeholder="Enter show time"
                    required
                  />
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddShowTime}>
                  Add Show Time
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;
