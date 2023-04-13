import { useEffect, useState } from 'react';

import { useData } from '@/components/Context';
import MoviesPage from '@/components/MoviesPage';

import { MovieProps } from '@/@types/Movie';

const title = 'Filmes mais votados';
const errorMessage = 'Infelizmente ocorreu algum erro. Recarregue a página ou tente novamente mais tarde.'

const Home = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { pageData, changePageData } = useData();

  const searchMovies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}&page=${pageData.page}`);
    const data = await res.json();
    changePageData('amountPages', data.total_pages);
    setMovies(data.results);
  };

  useEffect(() => {
    if (movies.length) searchMovies();
  }, [pageData.page]);

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <MoviesPage
      title={title}
      errorMessage={errorMessage}
      movies={movies}
    />
  );
};

export default Home;
