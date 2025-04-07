import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then((res) => setMovie(res.data));
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
      .then((res) => setCast(res.data.cast));
  }, [id]);

  const handleActorClick = (actorId) => {
    navigate(`/actor/${actorId}`);
  };

  if (!movie) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`${baseImageUrl}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 italic">{movie.tagline}</p>
          <p className="mt-2">{movie.overview}</p>
          <p className="mt-2">Release Date: {movie.release_date}</p>
          <p>Rating: ★ {movie.vote_average}/10</p>
          <p>Runtime: {movie.runtime} minutes</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {cast.slice(0, 8).map((actor) => (
          <div
            key={actor.id}
            className="text-center cursor-pointer hover:opacity-80 transition"
            onClick={() => handleActorClick(actor.id)}
          >
            <img
              src={actor.profile_path ? `${baseImageUrl}${actor.profile_path}` : 'https://via.placeholder.com/150'}
              alt={actor.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="mt-2 text-sm">{actor.name}</p>
            <p className="text-gray-400 text-xs">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;