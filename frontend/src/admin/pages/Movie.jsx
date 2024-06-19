import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddMovieModal from "../components/AddMovieModal";
import EditMovieModal from "../components/EditMovieModal";

const Movie = () => {
 const [films, setFilms] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [showAddModal, setShowAddModal] = useState(false);
 const [showEditModal, setShowEditModal] = useState(false);
 const [selectedMovieId, setSelectedMovieId] = useState(null);
 const [currentPage, setCurrentPage] = useState(1);
 const [filmsPerPage] = useState(10); // Jumlah film per halaman

 useEffect(() => {
  const fetchMovies = async () => {
   try {
    const response = await axios.get("http://localhost:5750/api/films");
    console.log("Film data:", response.data);
    setFilms(response.data);
    setLoading(false);
   } catch (error) {
    console.error("Error fetching data:", error);
    setError(error);
    setLoading(false);
   }
  };

  fetchMovies();
 }, []);

 // Menghitung indeks film pada halaman saat ini
 const indexOfLastFilm = currentPage * filmsPerPage;
 const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;

 // Menentukan data film yang akan ditampilkan pada halaman saat ini
 const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

 // Mengubah halaman
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const handleAdd = (newFilm) => {
  const token = sessionStorage.getItem("token");
  const formData = new FormData();

  for (const key in newFilm) {
   formData.append(key, newFilm[key]);
  }

  axios
   .post("http://localhost:5750/api/films", formData, {
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "multipart/form-data",
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
  const formData = new FormData();

  for (const key in updatedFilm) {
   formData.append(key, updatedFilm[key]);
  }

  axios
   .put(`http://localhost:5750/api/films/${id}`, formData, {
    headers: {
     Authorization: `Bearer ${token}`,
     "Content-Type": "multipart/form-data",
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
    .delete(`http://localhost:5750/api/films/${id}`, {
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
   .get("http://localhost:5750/api/films")
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
          <span className="mdi mdi-plus"></span> Add New Movie
         </button>
        </div>
       </div>
       <div className="row">
        <div className="col-lg-12">
         <div className="card rounded shadow border-0">
          <div className="card-body p-5 bg-dark rounded">
           <div
            className="table-responsive"
            style={{
             maxWidth: "1070px",
             overflowX: "auto",
             margin: "0px",
             padding: "0px",
            }}
           >
            <table
             className="table table-striped table-dark"
             style={{ margin: "0px" }}
            >
             <thead>
              <tr>
               <th>No</th>
               <th>Title</th>
               <th>Duration</th>
               <th>Genre</th>
               <th>Synopsis</th>
               <th>Trailer Link</th>
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
              {loading ? (
               <tr>
                <td colSpan="14" className="text-center">
                 Loading...
                </td>
               </tr>
              ) : error ? (
               <tr>
                <td colSpan="14" className="text-center">
                 Error: {error.message}
                </td>
               </tr>
              ) : (
               currentFilms.map((film, index) => (
                <tr key={film._id}>
                 <td>{indexOfFirstFilm + index + 1}</td>
                 <td>{film.name_film}</td>
                 <td>{film.duration}</td>
                 <td>{film.genre}</td>
                 <td
                  style={{
                   maxWidth: "300px",
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                   whiteSpace: "nowrap",
                  }}
                 >
                  {film.synopsis}
                 </td>
                 <td>
                  <a
                   href={`http://www.youtube.com/watch?v=${film.linkTrailer}`}
                   target="_blank"
                   rel="noopener noreferrer"
                  >
                   Watch Trailer
                  </a>
                 </td>
                 <td>
                  <img
                   src={`http://localhost:5750/uploads/members/${film.images[0].filename}`}
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
               ))
              )}
             </tbody>
            </table>
           </div>
           {/* Pagination */}
           <div className="d-flex justify-content-center mt-3">
            <Pagination>
             {[...Array(Math.ceil(films.length / filmsPerPage)).keys()].map(
              (number) => (
               <Pagination.Item
                key={number + 1}
                onClick={() => paginate(number + 1)}
                active={number + 1 === currentPage}
               >
                {number + 1}
               </Pagination.Item>
              )
             )}
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
