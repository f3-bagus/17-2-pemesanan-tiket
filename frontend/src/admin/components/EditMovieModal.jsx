import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMovieModal = ({ showModal, setShowModal, movieId, reloadMovies }) => {
  const [formData, setFormData] = useState({
    id_film: "",
    nama_film: "",
    durasi: "",
    genre: "",
    sinopsis: "",
    gambar: "",
    sutradara: "",
    penulis: "",
    pemeran: "",
    distributor: "",
    usia: "",
    harga: "",
  });

  useEffect(() => {
    // Fetch movie data based on movieId
    axios.get(`http://localhost:3000/api/films/${movieId}`)
      .then((response) => {
        const { id_film, nama_film, durasi, genre, sinopsis, gambar, sutradara, penulis, pemeran, distributor, usia, harga } = response.data;
        setFormData({
          id_film,
          nama_film,
          durasi,
          genre,
          sinopsis,
          gambar,
          sutradara,
          penulis,
          pemeran,
          distributor,
          usia: usia.toString(), // Ensure usia is a string for input type number
          harga: harga.toString(), // Ensure harga is a string for input type number
        });
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [movieId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/films/${movieId}`,
        formData
      );
      console.log("Data successfully updated:", response.data);
      reloadMovies(); // Panggil fungsi reloadMovies untuk memuat ulang data film
      setShowModal(false); // Tutup modal setelah berhasil mengubah data
      // Tambahkan logika lain yang diperlukan setelah sukses edit data
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className={`modal ${showModal ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Movie</h5>
            <button type="button" className="close" onClick={() => setShowModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>ID Film</label>
                <input
                  type="text"
                  className="form-control"
                  name="id_film"
                  value={formData.id_film}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_film"
                  value={formData.nama_film}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  name="durasi"
                  value={formData.durasi}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input
                  type="text"
                  className="form-control"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Synopsis</label>
                <textarea
                  className="form-control"
                  name="sinopsis"
                  value={formData.sinopsis}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="gambar"
                  value={formData.gambar}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Director</label>
                <input
                  type="text"
                  className="form-control"
                  name="sutradara"
                  value={formData.sutradara}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Writer</label>
                <input
                  type="text"
                  className="form-control"
                  name="penulis"
                  value={formData.penulis}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cast</label>
                <input
                  type="text"
                  className="form-control"
                  name="pemeran"
                  value={formData.pemeran}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Distributor</label>
                <input
                  type="text"
                  className="form-control"
                  name="distributor"
                  value={formData.distributor}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age Rating</label>
                <input
                  type="number"
                  className="form-control"
                  name="usia"
                  value={formData.usia}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="harga"
                  value={formData.harga}
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

export default EditMovieModal;
