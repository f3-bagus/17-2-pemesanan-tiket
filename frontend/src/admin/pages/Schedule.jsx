import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { loadCSS, cleanUpFiles } from "../utils/loadFiles";
import AddScheduleModal from "../components/AddScheduleModal";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]); // State untuk menyimpan data jadwal
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangani error
  const [showAddModal, setShowAddModal] = useState(false); // State untuk menampilkan modal tambah jadwal

  useEffect(() => {
    // Load CSS
    const cssPromises = [
      loadCSS("../assets/css/app.css"),
      loadCSS("../assets/css/bootstrap.css"),
      loadCSS("../assets/css/perfect-scrollbar.css"),
      loadCSS("../assets/css/Chart.min.css"),
    ];

    // Wait until all files are loaded
    Promise.all([...cssPromises])
      .then(() => console.log("Semua file telah dimuat dengan sukses"))
      .catch((error) => console.error("Kesalahan saat memuat file:", error));

    // Fetch data dari API menggunakan axios
    axios
      .get("http://localhost:3000/api/admin/dashboard/schedules")
      .then((response) => {
        console.log("Data jadwal:", response.data); // Tambahkan log ini
        setSchedules(response.data); // Set data jadwal ke state
        setLoading(false); // Set status loading ke false
      })
      .catch((error) => {
        console.error("Kesalahan saat mengambil data:", error);
        setError(error); // Set error ke state
        setLoading(false); // Set status loading ke false
      });

    // Cleanup files when component unmounts
    return () => {
      cleanUpFiles([
        "app.css",
        "bootstrap.css",
        "perfect-scrollbar.css",
        "Chart.min.css",
      ]);
    };
  }, []);

  // Fungsi untuk menambah data jadwal
  const handleAdd = (newSchedule) => {
    axios
      .post("http://localhost:3000/api/admin/dashboard/schedules", newSchedule)
      .then((response) => {
        console.log("Jadwal berhasil ditambahkan:", response.data);
        setShowAddModal(false); // Tutup modal setelah berhasil tambah
        reloadSchedules(); // Memuat ulang daftar jadwal
      })
      .catch((error) => {
        console.error("Gagal menambahkan jadwal:", error);
      });
  };

  // Fungsi untuk memuat ulang data jadwal setelah perubahan
  const reloadSchedules = () => {
    axios
      .get("http://localhost:3000/api/admin/dashboard/schedules")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Kesalahan saat memuat ulang data jadwal:", error);
      });
  };

  // Menampilkan pesan loading atau error
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Terjadi kesalahan: {error.message}</p>;

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
                    onClick={() => setShowAddModal(true)}
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
                            </tr>
                          </thead>
                          <tbody>
                            {schedules.map((schedule, index) => (
                              <tr key={schedule._id}>
                                <td>{index + 1}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.showTimes.join(", ")}</td>
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
            <Footer />
          </div>
        </div>
      </div>

      {/* Modal untuk tambah jadwal */}
      <AddScheduleModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default Schedule;
