import { useEffect, useState } from 'react';

import MovieCard from '@/components/MovieCard';

import { MovieProps } from '@/@types/Movie';
import PageButton from '@/components/PageButton';

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
    <div className='flex flex-col mt-20 mb-16'>
      {
        movies.length !== 0 && (
          <>
            <h1 className='text-5xl text-center font-bold mb-20'>
              Filmes mais votados
            </h1>

            <div className='flex flex-wrap justify-center gap-6 sm:gap-12 px-6 sm:px-8'>
              {
                movies.map(movie => {
                  if (movie.poster_path == null) return;

                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />
                  )
                })
              }
            </div>

            <div className='flex justify-center mt-8'>
              <div className='w-96 flex justify-between'>
                <PageButton
                  buttonType='previous'
                  page={page}
                  setPage={setPage}
                />

                {
                  Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <PageButton
                        key={index}
                        buttonType='next'
                        amountPages={amountPages}
                        buttonValue={page + index + 1}
                        page={page}
                        setPage={setPage}
                      />
                    )
                  })
                }

                <PageButton
                  buttonType='next'
                  amountPages={amountPages}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </div>
          </>

        )
      }

      {
        movies.length === 0 && (
          <div className='h-full flex justify-center my-36'>
            <h1 className='text-4xl sm:text-5xl text-center font-bold mx-8'>
              Carregando filmes...
            </h1>
          </div>
        )
      }
    </div>
  );
};

export default Home;
