import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import MoviesPage from '@/components/MoviesPage';

import { MovieProps } from '@/@types/Movie';

let title = '';
const errorMessage = 'Infelizmente não há resultados para o filme que tentou buscar ou ocorreu algum problema.';

const Search = () => {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [page, setPage] = useState(1);
    const [amountPages, setAmountPages] = useState(5);

    const router = useRouter();
    const query = router.query['q'];

    const getMovies = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`);
        const data = await res.json();
        setAmountPages(data.total_pages);
        setMovies(data.results);
    };

    useEffect(() => {
        if (movies.length)
            getMovies();
    }, [page]);

    useEffect(() => {
        if (!query) return;

        title = `Resultado(s) para: ${query}`;
        getMovies();
    }, [query])

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

export default Search;
