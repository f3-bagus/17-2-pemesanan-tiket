import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMovieModal = ({ showModal, setShowModal, reloadMovies }) => {
  const [formData, setFormData] = useState({
    name_film: "",
    duration: "",
    genre: "",
    synopsis: "",
    images: null, // diganti dari string menjadi null untuk file gambar
    director: "",
    writer: "",
    cast: "",
    distributor: "",
    age: "",
    price: "",
  });

  useEffect(() => {
    if (showModal) {
      // Reset form data when modal is opened
      setFormData({
        name_film: "",
        duration: "",
        genre: "",
        synopsis: "",
        images: null,
        director: "",
        writer: "",
        cast: "",
        distributor: "",
        age: "",
        price: "",
      });
    }
  }, [showModal]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      // Handle file input separately
      setFormData({ ...formData, images: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send with Axios
    const formDataToSend = new FormData();
    formDataToSend.append("name_film", formData.name_film);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("synopsis", formData.synopsis);
    formDataToSend.append("images", formData.images); // append the file object

    formDataToSend.append("director", formData.director);
    formDataToSend.append("writer", formData.writer);
    formDataToSend.append("cast", formData.cast);
    formDataToSend.append("distributor", formData.distributor);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("price", formData.price);

    console.log("Form Data to Send:", {
      name_film: formData.name_film,
      duration: formData.duration,
      genre: formData.genre,
      synopsis: formData.synopsis,
      images: formData.images, // file object
      director: formData.director,
      writer: formData.writer,
      cast: formData.cast,
      distributor: formData.distributor,
      age: formData.age,
      price: formData.price,
    });

    // Ambil token dari sessionStorage
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/films",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // perlu ditambahkan header ini untuk mengirimkan file
          },
        }
      );

      console.log("Data successfully added:", response.data);
      reloadMovies(); // Panggil fungsi reloadMovies untuk memuat ulang data film
      setShowModal(false); // Tutup modal setelah berhasil menambahkan data
    } catch (error) {
      console.error("Error adding data:", error);
      setShowModal(false);
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
            <h5 className="modal-title">Add New Movie</h5>
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
                <label>Image Upload</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="images"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png" // tambahkan sesuai dengan ekstensi file gambar yang diterima
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

export default AddMovieModal;
