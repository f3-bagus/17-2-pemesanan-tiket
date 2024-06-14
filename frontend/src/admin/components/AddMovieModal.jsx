import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMovieModal = ({ showModal, setShowModal, reloadMovies }) => {
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
    if (showModal) {
      // Fetch data films ketika modal dibuka
      axios.get("http://localhost:3000/api/films")
        .then(response => {
          const films = response.data;
          const highestId = Math.max(...films.map(film => film.id_film), 0);
          setFormData(formData => ({
            ...formData,
            id_film: highestId + 1
          }));
        })
        .catch(error => {
          console.error("Error fetching films:", error);
        });
    }
  }, [showModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi data sebelum dikirim
    const validData = {
      id_film: formData.id_film,
      nama_film: formData.nama_film,
      durasi: formData.durasi,
      genre: formData.genre,
      sinopsis: formData.sinopsis,
      gambar: formData.gambar,
      sutradara: formData.sutradara,
      penulis: formData.penulis,
      pemeran: formData.pemeran,
      distributor: formData.distributor,
      usia: formData.usia,
      harga: formData.harga,
    };

    console.log("Validated form data:", validData); // Logging validated form data

    try {
      const response = await axios.post(
        "http://localhost:3000/api/films",
        validData
      );
      console.log("Data successfully added:", response.data);
      reloadMovies(); // Panggil fungsi reloadMovies untuk memuat ulang data film
      setShowModal(false); // Tutup modal setelah berhasil menambahkan data
      // Tambahkan logika lain yang diperlukan setelah sukses tambah data
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error adding data:", error.response.data);
        setShowModal(false);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        setShowModal(false);
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", error.message);
        setShowModal(false);
      }
    }
  };

  return (
    <div className={`modal ${showModal ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Movie</h5>
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
                  onChange={handleChange}
                  readOnly
                  required
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

export default AddMovieModal;
