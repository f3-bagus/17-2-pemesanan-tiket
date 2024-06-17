import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { loadCSS, cleanUpFiles } from "../utils/loadFiles";
import AddScheduleModal from "../components/AddScheduleModal";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);

  useEffect(() => {
    const cssPromises = [
      loadCSS("../assets/css/app.css"),
      loadCSS("../assets/css/bootstrap.css"),
      loadCSS("../assets/css/perfect-scrollbar.css"),
      loadCSS("../assets/css/Chart.min.css"),
    ];

    Promise.all([...cssPromises])
      .then(() => console.log("Semua file telah dimuat dengan sukses"))
      .catch((error) => console.error("Kesalahan saat memuat file:", error));

    axios
      .get("http://localhost:3000/api/schedules")
      .then((response) => {
        console.log("Data jadwal:", response.data);
        setSchedules(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kesalahan saat mengambil data:", error);
        setError(error);
        setLoading(false);
      });

    return () => {
      cleanUpFiles([
        "app.css",
        "bootstrap.css",
        "perfect-scrollbar.css",
        "Chart.min.css",
      ]);
    };
  }, []);

  const handleAdd = (newSchedule) => {
    axios
      .post("http://localhost:3000/api/schedules", newSchedule, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Jadwal berhasil ditambahkan:", response.data);
        setShowAddModal(false);
        reloadSchedules();
      })
      .catch((error) => {
        console.error("Gagal menambahkan jadwal:", error);
      });
  };

  const handleEdit = (updatedSchedule) => {
    axios
      .put(`http://localhost:3000/api/schedules/${updatedSchedule._id}`, updatedSchedule, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Jadwal berhasil diperbarui:", response.data);
        setShowAddModal(false);
        setEditSchedule(null);
        reloadSchedules();
      })
      .catch((error) => {
        console.error("Gagal memperbarui jadwal:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      axios
        .delete(`http://localhost:3000/api/schedules/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Jadwal berhasil dihapus:", response.data);
          reloadSchedules();
        })
        .catch((error) => {
          console.error("Gagal menghapus jadwal:", error);
        });
    }
  };

  const reloadSchedules = () => {
    axios
      .get("http://localhost:3000/api/schedules")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Kesalahan saat memuat ulang data jadwal:", error);
      });
  };

  return (
    <>
      <div className="container-scroller">
        <Sidebar />
        <div className="container-fluid page-body-wrapper bg-black">
          <Navbar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h2 className="page-title">Schedule</h2>
                <div className="page-header-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setShowAddModal(true);
                      setEditSchedule(null);
                    }}
                  >
                    <span className="mdi mdi-plus"></span>Add New Schedule
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
                              <th>Date</th>
                              <th>Show Times</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedules.map((schedule, index) => (
                              <tr key={schedule._id}>
                                <td>{index + 1}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.showTimes.join(", ")}</td>
                                <td>
                                  <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => {
                                      setShowAddModal(true);
                                      setEditSchedule(schedule);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(schedule._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddScheduleModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        editSchedule={editSchedule}
      />
      <Footer />
    </>
  );
};

export default Schedule;
