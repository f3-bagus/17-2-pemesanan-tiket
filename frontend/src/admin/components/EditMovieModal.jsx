import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMovieModal = ({ showModal, setShowModal, movieId, reloadMovies }) => {
  const [formData, setFormData] = useState({
    name_film: "",
    linkTrailer: "",
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
      .get(`http://localhost:5750/api/films/${movieId}`)
      .then((response) => {
        const {
          name_film,
          linkTrailer,
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
          linkTrailer,
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
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name_film", formData.name_film);
    formDataToSend.append("linkTrailer", formData.linkTrailer);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("synopsis", formData.synopsis);
    formDataToSend.append("images", formData.images);
    formDataToSend.append("director", formData.director);
    formDataToSend.append("writer", formData.writer);
    formDataToSend.append("cast", formData.cast);
    formDataToSend.append("distributor", formData.distributor);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("price", formData.price);

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5750/api/films/${movieId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data successfully updated:", response.data);
      reloadMovies(); // Panggil fungsi reloadMovies untuk memuat ulang data film
      setShowModal(false); // Tutup modal setelah berhasil mengubah data
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
                <label>Trailer Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="linkTrailer"
                  value={formData.linkTrailer}
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
                  type="file"
                  className="form-control-file"
                  name="images"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
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
                  type="text"
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
