import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import gradientStyle from '../../styles/Gradient.module.css';
import inputStyle from '../../styles/Input.module.css';

const Header = () => {
    const [searchParams, setSearchParams] = useState('');
    const [showInput, setShowInput] = useState(false);

    const router = useRouter();

    const search = () => {
        router.push(`/search?q=${searchParams}`);
        setSearchParams('');
    };

    const checkWidth = () => {
        const width = window.innerWidth;
        if (width >= 640)
            setShowInput(false);
    };

    useEffect(() => {
        window.addEventListener('resize', checkWidth);
    }, [])

    return (
        <div className={`${gradientStyle.gradient} min-h-20 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0 py-4 px-8`}>
            <div className='w-full flex justify-between'>
                <Link
                    href='/'
                    legacyBehavior
                >
                    <a className='text-3xl text-red-500 font-bold'>
                        NextFlix
                    </a>
                </Link>

                <button
                    type='button'
                    onClick={() => setShowInput(!showInput)}
                    className='flex sm:hidden flex-col items-end gap-2 w-10 mt-1'
                >
                    <span className='inline-block w-full h-1 bg-red-600 rounded-sm' />
                    <span className='inline-block w-8 h-1 bg-red-600 rounded-sm' />
                    <span className='inline-block w-6 h-1 bg-red-600 rounded-sm' />
                </button>

                <input
                    type='text'
                    placeholder='Buscar filmes'
                    value={searchParams}
                    onChange={e => setSearchParams(e.target.value)}
                    onKeyUp={e => e.key === 'Enter' ? search() : ''}
                    className={`${inputStyle.input} hidden sm:flex h-8 pl-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-md outline-none transition duration-300`}
                />
            </div>

            <input
                type='text'
                placeholder='Buscar filmes'
                value={searchParams}
                onChange={e => setSearchParams(e.target.value)}
                onKeyUp={e => e.key === 'Enter' ? search() : ''}
                style={showInput ? { display: 'flex' } : { display: 'none' }}
                className={`${inputStyle.input} w-full h-8 pl-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-md outline-none transition duration-300`}
            />
        </div>
    );
};

export default Header;
