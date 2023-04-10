import { useEffect, useState } from "react";

import MovieCard from "@/components/MovieCard";

import { MovieProps } from "@/@types/Movie";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const serachMovies = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    serachMovies();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-10 my-16 px-4">
      {
        movies.map((movie: MovieProps) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        })
      }

      {movies.length === 0 && 'Carregando filmes...'}
    </div>
  );
};

export default Home;
