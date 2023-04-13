import { useData } from "../Context";
import MovieCard from "../MovieCard";
import PageButton from "@/components/PageButton";

import { MovieProps } from "@/@types/Movie";

type Props = {
    title: string;
    errorMessage: string;
    movies: MovieProps[];
};

const MoviesPage = ({ title, errorMessage, movies }: Props) => {
    const { pageData } = useData();

    return (
        <div className="flex flex-col mt-16 sm:mt-20 mb-16">
            {movies.length !== 0 && (
                <>
                    <h1 className="text-4xl sm:text-5xl text-center font-bold mx-8 mb-16 sm:mb-20">
                        {title}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 px-6 sm:px-8">
                        {movies.map((movie) => {
                            if (movie.poster_path == null) return;

                            return <MovieCard key={movie.id} movie={movie} />;
                        })}
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="w-96 flex justify-between">
                            <PageButton buttonType="previous" />

                            {Array.from({ length: 4 }).map((_, index) => {
                                return (
                                    <PageButton
                                        key={index}
                                        buttonType="next"
                                        buttonValue={pageData.page + index + 1}
                                    />
                                );
                            })}

                            <PageButton buttonType="next" />
                        </div>
                    </div>
                </>
            )}

            {movies.length === 0 && (
                <div className="h-full flex justify-center my-36">
                    <h1 className="max-w-[800px] text-4xl sm:text-5xl text-center font-bold mx-8">
                        {errorMessage}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default MoviesPage;
