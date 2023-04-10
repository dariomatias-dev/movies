import { MovieProps } from "@/@types/Movie";
import Image from "next/image";
import Link from 'next/link';

type Props = {
    movie: MovieProps;
};

const MovieCard = ({ movie }: Props) => {
    return (
        <Link
            href={`/movie?id=${movie.id}`}
            legacyBehavior
        >
            <a className="flex flex-col justify-center w-[300px] bg-[#0B0B0B] mb-8 rounded-md overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_MOVIE_IMAGE}${movie.poster_path}`}
                    width={500}
                    height={500}
                    priority={true}
                    alt={`${movie.title} movie`}
                    className="w-full h-full"
                />
                <div className="flex items-center justify-between py-4 px-3">
                    <div className="flex flex-wrap gap-4">
                        <h2 className="">
                            {movie.title}
                        </h2>
                        <span>
                            {movie.release_date}
                        </span>
                    </div>
                    <span className="bg-[#18181B] text-zinc-300 font-bold ml-3 py-1 px-2 rounded-lg">
                        {movie.vote_average}
                    </span>
                </div>
            </a>
        </Link>
    );
};

export default MovieCard
