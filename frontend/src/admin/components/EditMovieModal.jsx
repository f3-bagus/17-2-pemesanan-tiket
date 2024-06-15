import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMovieModal = ({ showModal, setShowModal, movieId, reloadMovies }) => {
  const [formData, setFormData] = useState({
    name_film: "",
    duration: "",
    genre: "",
    synopsis: "",
    images: { url: "", filename: "" },
    director: "",
    writer: "",
    cast: "",
    distributor: "",
    age: "",
    price: "",
  });

  useEffect(() => {
    // Fetch movie data based on movieId
    axios
      .get(`http://localhost:3000/api/films/${movieId}`)
      .then((response) => {
        const {
          name_film,
          duration,
          genre,
          synopsis,
          images,
          director,
          writer,
          cast,
          distributor,
          age,
          price,
        } = response.data;
        setFormData({
          name_film,
          duration,
          genre,
          synopsis,
          images: images.length > 0 ? images[0] : { url: "", filename: "" },
          director,
          writer,
          cast,
          distributor,
          age,
          price: price.toString(), // Ensure price is a string for input type number
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
    const token = sessionStorage.getItem("token"); // Ambil token dari sessionStorage
    try {
      const response = await axios.put(
        `http://localhost:3000/api/films/${movieId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
          },
        }
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
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Movie</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="name_film"
                  value={formData.name_film}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  name="duration"
                  value={formData.duration}
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
                  name="synopsis"
                  value={formData.synopsis}
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
                  name="images.url"
                  value={formData.images.url}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Director</label>
                <input
                  type="text"
                  className="form-control"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Writer</label>
                <input
                  type="text"
                  className="form-control"
                  name="writer"
                  value={formData.writer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cast</label>
                <input
                  type="text"
                  className="form-control"
                  name="cast"
                  value={formData.cast}
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
                  type="string"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
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
