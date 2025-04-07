import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <img src={imageUrl} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
        <p className="text-yellow-400 text-sm">★ {movie.vote_average}/10</p>
      </div>
    </div>
  );
};

export default MovieCard;