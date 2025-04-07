import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const TopRatedPage = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ type: 'top_rated', page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchMovies({ type: 'top_rated', page }));
  };

  if (status === 'loading') return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Top Rated Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TopRatedPage;