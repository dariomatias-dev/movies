import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiFillStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsPersonHearts } from "react-icons/bs";
import { GiMoneyStack, GiTheater } from "react-icons/gi";
import { MdOutlineAttachMoney, MdTheaterComedy } from "react-icons/md";

import { useData } from "@/components/Context";
import Loading from "@/components/Loading";

import { MovieDetailedProps } from "@/@types/MovieDetailed";

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const Movie = () => {
    const [movie, setMovie] = useState({} as MovieDetailedProps);

    const { searchParams } = useData();

    const router = useRouter();
    const id = router.query["id"];

    const getMovie = async (movieURL: string) => {
        const res = await fetch(movieURL);
        const data: MovieDetailedProps = await res.json();

        const release_date = getReleaseMovie(data.release_date);
        data.release_year = data.release_date.split("-")[0];
        data.release_date = release_date;

        const runtime = getRuntimeMovie(Number(data.runtime));
        data.runtime_in_minutes = data.runtime.toString();
        data.runtime = runtime;

        setMovie(data);
    };

    const getReleaseMovie = (date: string) => {
        const release_date = new Date(date).toLocaleDateString("pt-BR");
        const day = release_date.split("/")[0];
        const month = release_date.split("/")[1];
        const years = release_date.split("/")[2];

        return `${Number(day)} de ${months[Number(month)]} de ${years}.`;
    };

    const getRuntimeMovie = (runtime: number) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        return `${hours} ${hours === 1 ? "hora" : "horas"} e ${minutes} ${
            minutes === 1 ? "minuto" : "minutos"
        }.`;
    };

    useEffect(() => {
        if (!id) return;

        const movieURL = `${process.env.NEXT_PUBLIC_API}${id}?${process.env.NEXT_PUBLIC_API_KEY}`;
        getMovie(movieURL);
    }, [id]);

    if (JSON.stringify(movie) === "{}") return <Loading />;

    return (
        <div className="h-full flex justify-center mx-8 mt-16 mb-20 sm:mt-20">
            <div className="w-full max-w-[900px]">
                <div className="flex flex-col md:flex-row gap-12">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE}${movie.poster_path}`}
                        width={500}
                        height={500}
                        priority={true}
                        alt={`${movie.title} movie.`}
                        className="w-full max-w-[300px] md:max-w-[500px] max-h-[550px] h-full mx-auto md:mx-0"
                    />

                    <div className="flex flex-col gap-4 mt-2 sm:mt-6 md:mt-12 mx-2 sm:mx-0">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {movie.title}
                        </h1>

                        <div className="flex gap-16">
                            <p>{movie.release_year}</p>
                            <p>{movie.runtime_in_minutes} min</p>
                        </div>

                        <div className="flex gap-2">
                            <AiFillStar className="w-6 h-6 text-yellow-300" />
                            {movie.vote_average}
                        </div>

                        {movie.tagline && <p>{movie.tagline}</p>}

                        <p className="text-justify">{movie.overview}</p>

                        <a
                            href="#details"
                            className="text-red-500 text-center font-light border-2 border-red-600 rounded-md mt-10 py-1 hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            Ver detalhes
                        </a>
                    </div>
                </div>

                <span className="inline-block w-full h-1 bg-zinc-800 my-20" />

                <div className="flex flex-col items-center">
                    <h2
                        id="details"
                        className="text-3xl text-center font-bold mb-12 sm:mb-16"
                    >
                        Informações sobre o filme
                    </h2>

                    <div className="flex flex-col items-center sm:grid grid-cols-2 gap-x-28 gap-y-8 text-center sm:text-start">
                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <GiTheater className="w-7 h-7 text-red-500" />
                                Lançado em:
                            </h2>

                            <p className="sm:ml-2">{movie.release_date}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <BiTimeFive className="w-8 h-8 text-red-500" />
                                Duração:
                            </h2>

                            <p className="sm:ml-1">{movie.runtime}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <MdTheaterComedy className="w-8 h-8 text-red-500" />
                                Gêneros:
                            </h2>

                            <ul>
                                {movie.genres?.map((genre) => {
                                    return (
                                        <li
                                            key={genre.id}
                                            className="sm:list-disc sm:ml-8"
                                        >
                                            {genre.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <BsPersonHearts className="w-8 h-8 text-red-500" />
                                Popularidade:
                            </h2>

                            <p className="sm:ml-2">{movie.popularity}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <MdOutlineAttachMoney className="w-8 h-8 text-red-500" />
                                Orçamento:
                            </h2>

                            <p className="sm:ml-3">
                                {movie.budget === 0
                                    ? "---"
                                    : movie.budget?.toLocaleString("pt-BR", {
                                          currency: "BRL",
                                          style: "currency",
                                      })}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <GiMoneyStack className="w-8 h-8 text-red-500" />
                                Receita:
                            </h2>

                            <p className="sm:ml-2">
                                {movie.revenue === 0
                                    ? "---"
                                    : movie.revenue?.toLocaleString("pt-BR", {
                                          currency: "BRL",
                                          style: "currency",
                                      })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href={searchParams ? `/search?q=${searchParams}` : '/'} legacyBehavior>
                        <a className="w-80 bg-red-500 hover:bg-transparent text-white hover:text-red-500 text-center mt-14 sm:mt-20 p-2 border-2 border-red-500 rounded-md transition duration-300">
                            Voltar
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Movie;
