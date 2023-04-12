import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import MovieCard from '@/components/MovieCard';

import { MovieProps } from '@/@types/Movie';

const Search = () => {
    const [movies, setMovies] = useState<MovieProps[]>([]);

    const router = useRouter();
    const query = router.query['q'];

    const getMovies = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    };

    useEffect(() => {
        if (!query) return;
        const searchWithQueryURL = `${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`;
        getMovies(searchWithQueryURL);
    }, [query])

    return (
        <div className='flex flex-col gap-20 mt-20 mb-16'>
            <h1 className='text-5xl text-center font-bold'>
                Resultado(s) para: {query}
            </h1>

            <div className='flex flex-wrap justify-center gap-10 px-4'>
                {
                    movies?.map(movie => {
                        if (movie.poster_path == null) return;

                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                            />
                        )
                    })
                }
                {movies?.length === 0 && 'Carregando filmes...'}
            </div>
        </div>
    );
};

export default Search;
