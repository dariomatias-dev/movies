import { useEffect, useState } from "react";

import { useData } from "@/components/Context";
import MoviesPage from "@/components/MoviesPage";

import { MovieProps } from "@/@types/Movie";
import Loading from "@/components/Loading";

const title = "Filmes mais votados";
const errorMessage =
    "Infelizmente ocorreu algum erro. Recarregue a página ou tente novamente mais tarde.";

const Home = () => {
    const [movies, setMovies] = useState<MovieProps[]>([]);

    const { pageData, changePageData } = useData();

    // Faz uma requisição para API buscando os dados dos filmes e guardando em seguida.
    const searchMovies = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}top_rated?${process.env.NEXT_PUBLIC_API_KEY}&page=${pageData.page}`
        );
        const data = await res.json();
        changePageData("amountPages", data.total_pages);

        setMovies(data.results);
    };

    // Quando "pageData.page" mudar, ou em outras palavras, o número da página que deve ser exibida mudar, e "movies" estiver vazio, a função de buscar filmes é chamada.
    useEffect(() => {
        if (movies.length) searchMovies();
    }, [pageData.page]);

    // Chama a função de buscar filmes quando a página é aberta.
    useEffect(() => {
        searchMovies();
    }, []);

    // Caso "movies" esteja vazio, é mostrado um componente de carregamento.
    if (!movies.length) return <Loading />;

    return (
        <MoviesPage title={title} errorMessage={errorMessage} movies={movies} />
    );
};

export default Home;
