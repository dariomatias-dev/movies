import { useEffect, useState } from 'react';

import MoviesPage from '@/components/MoviesPage';

import { MovieProps } from '@/@types/Movie';

const title = 'Filmes mais votados';
const errorMessage = 'Infelizmente ocorreu algum erro. Recarregue a página ou tente novamente mais tarde.'

const Home = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [page, setPage] = useState(1);
  const [amountPages, setAmountPages] = useState(5);

  const searchMovies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`);
    const data = await res.json();
    setAmountPages(data.total_pages);
    setMovies(data.results);
  };

  useEffect(() => {
    if (movies.length)
      searchMovies();
  }, [page]);

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <MoviesPage
      title={title}
      errorMessage={errorMessage}
      amountPages={amountPages}
      movies={movies}
      page={page}
      setPage={setPage}
    />
  );
};

export default Home;
