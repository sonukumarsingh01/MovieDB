import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMovies } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const { movies, currentPage, totalPages, status } = useSelector((state) => state.movies);

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies({ type: 'search', page: currentPage, query }));
    }
  }, [dispatch, currentPage, query]);

  const handlePageChange = (page) => {
    dispatch(fetchMovies({ type: 'search', page, query }));
  };

  if (status === 'loading') return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Search Results for "{query}"</h1>
      {movies.length === 0 ? (
        <p className="text-white">No results found.</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SearchPage;