import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { loadCSS, cleanUpFiles } from "../utils/loadFiles";
import AddMovieModal from "../components/AddMovieModal";
import EditMovieModal from "../components/EditMovieModal";

const Movie = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    // Load CSS files
    const cssPromises = [
      loadCSS("../assets/css/app.css"),
      loadCSS("../assets/css/bootstrap.css"),
      loadCSS("../assets/css/perfect-scrollbar.css"),
      loadCSS("../assets/css/Chart.min.css"),
    ];

    // Wait until all CSS files are loaded
    Promise.all([...cssPromises])
      .then(() => console.log("All CSS files loaded successfully"))
      .catch((error) => console.error("Error loading CSS files:", error));

    // Fetch movies from API using axios
    axios
      .get("http://localhost:3000/api/films")
      .then((response) => {
        console.log("Film data:", response.data);
        setFilms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });

    // Clean up CSS files on component unmount
    return () => {
      cleanUpFiles([
        "app.css",
        "bootstrap.css",
        "perfect-scrollbar.css",
        "Chart.min.css",
      ]);
    };
  }, []);

  const handleAdd = (newFilm) => {
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:3000/api/films", newFilm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Film added successfully:", response.data);
        setShowAddModal(false);
        reloadMovies();
      })
      .catch((error) => {
        console.error("Failed to add film:", error);
      });
  };

  const handleEdit = (id, updatedFilm) => {
    const token = sessionStorage.getItem("token");
    axios
      .put(`http://localhost:3000/api/films/${id}`, updatedFilm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Film updated successfully:", response.data);
        setShowEditModal(false);
        reloadMovies();
      })
      .catch((error) => {
        console.error("Failed to edit film:", error);
      });
  };

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:3000/api/films/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Film deleted successfully:", id);
          reloadMovies();
        })
        .catch((error) => {
          console.error("Failed to delete film:", error);
        });
    }
  };

  const reloadMovies = () => {
    axios
      .get("http://localhost:3000/api/films")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.error("Error reloading movies:", error);
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
                      <div className="table-responsive" style={{ maxWidth: "1000px", overflowX: "auto" }}>
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
                            {films.map((film, index) => (
                              <tr key={film._id}>
                                <td>{index + 1}</td>
                                <td>{film.name_film}</td>
                                <td>{film.duration}</td>
                                <td>{film.genre}</td>
                                <td style={{
                                  maxWidth: "300px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}>{film.synopsis}</td>
                                <td>
                                  <img
                                    src={`http://localhost:3000/uploads/members/${film.images[0].filename}`}
                                    alt="poster"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                      borderRadius: "8px",
                                    }}
                                  />
                                </td>
                                <td>{film.director}</td>
                                <td>{film.writer}</td>
                                <td>{film.cast}</td>
                                <td>{film.distributor}</td>
                                <td>{film.age}</td>
                                <td>{film.price}</td>
                                <td>
                                  <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => {
                                      setSelectedMovieId(film._id);
                                      setShowEditModal(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(film._id)}
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
            <Footer />
          </div>
        </div>
      </div>

      {/* Modal for adding a new movie */}
      <AddMovieModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        reloadMovies={reloadMovies}
        handleAdd={handleAdd}
      />

      {/* Modal for editing a movie */}
      {selectedMovieId && (
        <EditMovieModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          movieId={selectedMovieId}
          reloadMovies={reloadMovies}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default Movie;
