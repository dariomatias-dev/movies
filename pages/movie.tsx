import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Movie = () => {
    const [movie, setMovie] = useState<any>();

    const router = useRouter();
    const id = router.query['id'];

    const getMovie = async (movieURL: string) => {
        const res = await fetch(movieURL);
        const data = await res.json();
        console.log(data)
    };

    useEffect(() => {
        if (!id) return;

        const movieURL = `${process.env.NEXT_PUBLIC_API}${id}?${process.env.NEXT_PUBLIC_API_KEY}`;
        getMovie(movieURL);
    }, [id]);

    return (
        <>
            <h1 className="text-4xl font-bold">
                {id}
            </h1>
        </>
    );
};

export default Movie;
