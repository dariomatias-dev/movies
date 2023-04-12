import { useEffect, useState } from 'react';

import MovieCard from '@/components/MovieCard';

import { MovieProps } from '@/@types/Movie';

const Home = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const serachMovies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    serachMovies();
  }, []);

  return (
    <div className='flex flex-col gap-20 mt-20 mb-16'>
      {
        movies.length !== 0 && (
          <>
            <h1 className='text-5xl text-center font-bold'>
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
