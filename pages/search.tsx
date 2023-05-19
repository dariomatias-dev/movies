import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useData } from "@/components/Context";
import Loading from "@/components/Loading";
import MoviesPage from "@/components/MoviesPage";

import { MovieProps } from "@/@types/Movie";

let title = "";
const errorMessage =
    "Infelizmente não há resultados para o filme que tentou buscar ou ocorreu algum problema.";

const Search = () => {
    const [movies, setMovies] = useState<MovieProps[]>([]);

    const { pageData, changePageData } = useData();

    const router = useRouter();
    const query = router.query["q"];

    // Manda para a API o nome que deve bsucar filmes nomes correspondentes.
    const getMovies = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SEARCH}?${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${pageData.page}`
        );
        const data = await res.json();
        changePageData("amountPages", data.total_pages);

        setMovies(data.results);
    };

    // Quando "pageData.page" mudar, ou em outras palavras, o número da página que deve ser exibida mudar, e "movies" estiver vazio, a função de buscar filmes é chamada.
    useEffect(() => {
        if (movies.length) getMovies();
    }, [pageData.page]);

    // Quando "query" mudar e não estiver vazia, define o valor do título da página de resultado de filmes.
    useEffect(() => {
        if (!query) return;

        title = `Resultado(s) para: ${query}`;
        getMovies();
    }, [query]);

    if (!movies.length) return <Loading />;

    return (
        <MoviesPage title={title} errorMessage={errorMessage} movies={movies} />
    );
};

export default Search;
