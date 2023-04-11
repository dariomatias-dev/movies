import { MovieProps } from '@/@types/Movie';

export type MovieDetailedProps = {
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    } | null;
    budget: number;
    genres: Array<{
        id: number;
        name: string;
    }>;
    homepage: string;
    imdb_id: string;
    production_companies: Array<{
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    revenue: number;
    runtime: number | string;
    spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
    }>;
    status: string;
    tagline: string;
} & MovieProps;
