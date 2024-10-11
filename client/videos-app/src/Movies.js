import MovieList from './MovieList';

const Movies = () => {
  return (
    <div>
      <MovieList title={'Movies'} setPageSize={12} />
    </div>
  );
}
export default Movies;