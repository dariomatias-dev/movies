import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import gradientStyle from '../../styles/Gradient.module.css';
import inputStyle from '../../styles/Input.module.css';

const Header = () => {
    const [searchParams, setSearchParams] = useState('');

    const router = useRouter();

    const search = () => router.push(`/search?q=${searchParams}`);

    return (
        <div className={`${gradientStyle.gradient} flex justify-between items-center h-20 px-8`}>
            <Link
                href='/'
                legacyBehavior
            >
                <a className='text-3xl text-red-500 font-bold'>
                    NextFlix
                </a>
            </Link>

            <input
                type='text'
                placeholder='Buscar filmes'
                onChange={e => setSearchParams(e.target.value)}
                onKeyUp={e => e.key === 'Enter' ? search() : ''}
                className={`${inputStyle.input} h-8 pl-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-md outline-none transition duration-300`}
            />
        </div>
    );
};

export default Header;
