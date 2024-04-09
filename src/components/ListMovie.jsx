
import React from "react";
import axios from "axios"
import Movie from "./Movie";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function ListMovie({ratingValue}) {
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(1)
    const [searchKey, setSearchKey] = useState("");
    const minVoteAvg = (ratingValue -1)*2;

    const URL = "https://api.themoviedb.org/3"
    
    // Llamada a la Api con las primeras 20 peliculas
        const getMovies = async (searchKey)=>{
            const type = searchKey ? "search" : "discover"
            const response = await axios({
            method: "get",
            url: `${URL}/${type}/movie`,
            params: {
                query: searchKey,
                include_adult: "false",
                page: 1,
                "vote_average.gte": minVoteAvg,
                api_key: import.meta.env.VITE_TMDB_API_KEY,
            }
        })
            setMovie(response.data.results)
        }
        const searchMovie = (e)=>{
            e.preventDefault();
            getMovies(searchKey)
          };
        useEffect(() => {
        getMovies();
    }, [ratingValue])

    // Llamada a la Api para el scroll infinito.
       
        const scrollMovies = async ()=>{
            const response = await axios({
                method: "get",
                url: "https://api.themoviedb.org/3/discover/movie",
                params: {
                    include_adult: "false",
                    page: page,
                    "vote_average.gte": minVoteAvg,
                    api_key: import.meta.env.VITE_TMDB_API_KEY
                }
            })
            setMovie([...movie, ...response.data.results])
        };
        useEffect(() => {
        scrollMovies();
    }, [page]);
    

    return(
        <div className="container pb-5">
            <InfiniteScroll
                dataLength={movie.length}
                next={()=>setPage(page + 1)}
                hasMore={true}
                loader={<h4>Loading...</h4>}    
        >
                <div className="mb-5 d-flex justify-content-end">
                    <form onSubmit={searchMovie}>
                        <input type="text" placeholder="Type your movie" onChange={(e)=>setSearchKey(e.target.value)} className="me-2 rounded p-2" />
                        <button className="btn btn-success py-2">Search</button>
                    </form>
                </div>
                <div className="row row-cols-md-4 g-4 pb-5 mx-4">
                    {movie.map((movie) => (
                        <div key={movie.id} className="col-md-3 col-4">
                            <Movie movie={movie} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default ListMovie
