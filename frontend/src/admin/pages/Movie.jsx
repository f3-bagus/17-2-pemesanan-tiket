import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { loadCSS, cleanUpFiles } from "../utils/loadFiles";
import AddMovieModal from "../components/AddMovieModal";
import EditMovieModal from "../components/EditMovieModal";

const Movie = () => {
  const [films, setFilms] = useState([]); // State untuk menyimpan data film
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangani error
  const [showAddModal, setShowAddModal] = useState(false); // State untuk menampilkan modal tambah film
  const [showEditModal, setShowEditModal] = useState(false); // State untuk menampilkan modal edit film
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State untuk menyimpan id film yang akan di-edit

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
      .get("http://localhost:3000/api/films")
      .then((response) => {
        console.log("Data film:", response.data); // Tambahkan log ini
        setFilms(response.data); // Set data film ke state
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

  // Fungsi untuk menambah data film
  const handleAdd = (newFilm) => {
    axios
      .post("http://localhost:3000/api/films", newFilm)
      .then((response) => {
        console.log("Film berhasil ditambahkan:", response.data);
        setShowAddModal(false); // Tutup modal setelah berhasil tambah
        reloadMovies(); // Memuat ulang daftar film
      })
      .catch((error) => {
        console.error("Gagal menambahkan film:", error);
      });
  };

  // Fungsi untuk mengedit data film
  const handleEdit = (id, updatedFilm) => {
    axios
      .put(`http://localhost:3000/api/films/${id}`, updatedFilm)
      .then((response) => {
        console.log("Film berhasil diubah:", response.data);
        setShowEditModal(false); // Tutup modal setelah berhasil edit
        reloadMovies(); // Memuat ulang daftar film
      })
      .catch((error) => {
        console.error("Gagal mengedit film:", error);
      });
  };

  // Fungsi untuk menghapus data film
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus film ini?")) {
      axios
        .delete(`http://localhost:3000/api/films/${id}`)
        .then((response) => {
          console.log("Film berhasil dihapus:", id);
          reloadMovies(); // Memuat ulang daftar film setelah berhasil hapus
        })
        .catch((error) => {
          console.error("Gagal menghapus film:", error);
        });
    }
  };

  // Fungsi untuk memuat ulang data film setelah perubahan
  const reloadMovies = () => {
    axios
      .get("http://localhost:3000/api/films")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.error("Kesalahan saat memuat ulang data film:", error);
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
                <h2 className="page-title">Movies</h2>
                <div className="page-header-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                  >
                    <span className="mdi mdi-plus"></span>Add New Movie
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
                              <th>Title</th>
                              <th>Duration</th>
                              <th>Genre</th>
                              <th>Synopsis</th>
                              <th>Image</th>
                              <th>Director</th>
                              <th>Writer</th>
                              <th>Cast</th>
                              <th>Distributor</th>
                              <th>Age</th>
                              <th>Price</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {films.map((film, index) => {
                              return (
                                <tr key={film.id_film}>
                                  <td>{index + 1}</td>
                                  <td>{film.nama_film}</td>
                                  <td>{film.durasi}</td>
                                  <td>{film.genre}</td>
                                  <td
                                    style={{
                                      maxWidth: "300px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {film.sinopsis}
                                  </td>
                                  <td>
                                    <img
                                      src={film.gambar}
                                      alt="poster"
                                      style={{
                                        width: "10vh",
                                        height: "100%",
                                        borderRadius: "0",
                                      }}
                                    />
                                  </td>
                                  <td>{film.sutradara}</td>
                                  <td>{film.penulis}</td>
                                  <td>{film.pemeran}</td>
                                  <td>{film.distributor}</td>
                                  <td>{film.usia}</td>
                                  <td>{film.harga}</td>
                                  <td>
                                    <button
                                      className="btn btn-warning btn-sm"
                                      onClick={() => {
                                        setSelectedMovieId(film.id_film);
                                        setShowEditModal(true);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDelete(film.id_film)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
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

      {/* Modal untuk tambah film */}
      <AddMovieModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        reloadMovies={reloadMovies} // Sertakan properti reloadMovies di sini
        handleAdd={handleAdd}
      />

      {/* Modal untuk edit film */}
      {selectedMovieId && (
        <EditMovieModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          movieId={selectedMovieId}
          reloadMovies={reloadMovies} // Sertakan properti reloadMovies di sini
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default Movie;
