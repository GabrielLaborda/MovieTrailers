import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YouTube from 'react-youtube';
import './ModalMovie.css'

function ModalMovie({ show, handleClose, movie }) {
  const [trailer, setTrailer] = useState("");
  const [playing, setPlaying] = useState(false);

  
  const fetchMovie = async (id) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          append_to_response: "videos",
        },
      });
      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find((vid) => vid.name === "Official Trailer");
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayTrailer = () => {
    fetchMovie(movie.id);
    setPlaying(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="flex flex-column align-items-start">
            <Modal.Title>
              {movie.title} - {new Date(movie.release_date).getFullYear()}
            </Modal.Title>
            <h6 className="pt-2">Rating: {movie.vote_average} / 10</h6>
          </div>
        </Modal.Header>
        <Container>
          <Row>
            <Col md={6}>
              <img className="img-fluid rounded" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
            </Col>
            <Col md={6}>
              <Modal.Body>
                <h5>Overview</h5>
                {movie.overview}
              </Modal.Body>
            </Col>
          </Row>
        </Container>
        <Modal.Footer>
          <Button variant="success" onClick={handlePlayTrailer}>
            Play Trailer
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {playing && (
        <div className="youtube-player-container">
          <YouTube
            videoId={trailer.key}
            className="youtube-player"
            opts={{
              height: "100%",
              width: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
          <button className="btn btn-secondary" onClick={() => setPlaying(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default ModalMovie;
