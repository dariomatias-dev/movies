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
        <>
            {
                movies.length !== 0 && (
                    <div className='flex flex-col gap-20 mt-20 mb-16'>

                        <h1 className='text-4xl sm:text-5xl text-center font-bold'>
                            Resultado(s) para: {query}
                        </h1>

                        <div className='flex flex-wrap justify-center gap-10 px-8'>
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
                )
            }

            {
                movies.length === 0 && (
                    <div className='h-full flex justify-center my-36'>
                        <h1 className='max-w-[800px] text-4xl sm:text-5xl text-center font-bold mx-8'>
                            Infelizmente não há resultados para o filme que tentou buscar, ou ocorreu algum problema.
                        </h1>
                    </div>
                )
            }
        </>
    );
};

export default Search;
