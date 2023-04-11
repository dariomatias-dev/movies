import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsPersonHearts } from 'react-icons/bs';
import { GiMoneyStack, GiTheater } from 'react-icons/gi';
import { MdDescription, MdOutlineAttachMoney, MdTheaterComedy } from 'react-icons/md';

import { MovieDetailedProps } from '@/@types/MovieDetailed';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const Movie = () => {
    const [movie, setMovie] = useState({} as MovieDetailedProps);

    const router = useRouter();
    const id = router.query['id'];

    const getMovie = async (movieURL: string) => {
        const res = await fetch(movieURL);
        const data: MovieDetailedProps = await res.json();

        const release_date = getReleaseMovie(data.release_date);
        data.release_date = release_date;

        const runtime = getRuntimeMovie(Number(data.runtime));
        data.runtime = runtime;

        setMovie(data);
    };

    const getReleaseMovie = (date: string) => {
        const release_date = new Date(date).toLocaleDateString('pt-BR');
        const day = release_date.split('/')[0];
        const month = release_date.split('/')[1];
        const years = release_date.split('/')[2];

        return `${Number(day)} de ${months[Number(month)]} de ${years}.`;
    };

    const getRuntimeMovie = (runtime: number) => {
        let hours = Math.floor(runtime / 60);
        let minutes = runtime % 60;

        return `${hours} horas e ${minutes} minutos.`;
    };

    useEffect(() => {
        if (!id) return;

        const movieURL = `${process.env.NEXT_PUBLIC_API}${id}?${process.env.NEXT_PUBLIC_API_KEY}`;
        getMovie(movieURL);
    }, [id]);

    return (
        <div className='h-full flex justify-center my-10'>
            <div className='w-full max-w-[800px]'>
                <div className='flex flex-col items-center gap-6'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE}${movie.poster_path}`}
                        width={500}
                        height={500}
                        alt={`${movie.title} movie.`}
                        className='max-w-[500px] max-h-[650px] h-full'
                    />
                    <h1 className='text-3xl font-bold'>
                        {movie.title}
                    </h1>
                    <div className='flex gap-2'>
                        <AiFillStar className='w-6 h-6 text-yellow-300' />
                        {movie.vote_average}
                    </div>

                    {
                        movie.tagline && (
                            <p>{movie.tagline}</p>
                        )
                    }
                </div>
                <div className='flex flex-col gap-6 mt-12'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <GiTheater className='w-7 h-7 text-red-500' />
                            Lançado em:
                        </h2>
                        <p>
                            {movie.release_date}
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <MdDescription className='w-8 h-8 text-red-500' />
                            Descrição:
                        </h2>
                        <p>
                            {movie.overview}
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <BiTimeFive className='w-8 h-8 text-red-500' />
                            Duração:
                        </h2>
                        <p>
                            {movie.runtime}
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <MdTheaterComedy className='w-8 h-8 text-red-500' />
                            Gêneros:
                        </h2>
                        <ul>
                            {
                                movie.genres?.map(genre => {
                                    return (
                                        <li
                                            key={genre.id}
                                            className='list-disc ml-8'
                                        >
                                            {genre.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <BsPersonHearts className='w-8 h-8 text-red-500' />
                            Popularidade:
                        </h2>
                        <p>
                            {movie.popularity}
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <MdOutlineAttachMoney className='w-8 h-8 text-red-500' />
                            Orçamento:
                        </h2>
                        <p>
                            {movie.budget?.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
                        </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className='flex items-center gap-2 text-2xl font-bold'>
                            <GiMoneyStack className='w-8 h-8 text-red-500' />
                            Receita:
                        </h2>
                        <p>
                            {movie.revenue?.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
