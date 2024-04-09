import { useState } from 'react';
import ModalMovie from './ModalMovie';
import "./Movie.css"

function Movie({ movie }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div>
        <img
          className="img-fluid rounded imgCard"
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt=""
          onClick={handleShowModal}
        />
      </div>
      {showModal && <ModalMovie show={showModal} handleClose={handleCloseModal} movie={movie} />}
    </>
  );
}

export default Movie;
