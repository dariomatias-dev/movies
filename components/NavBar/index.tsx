import Link from 'next/link';
import { GoSearch } from 'react-icons/go';

const NavBar = () => {
    return (
        <div className="flex justify-between items-center h-20 bg-[#0B0B0B] px-8">
            <Link
                href='/'
                legacyBehavior
            >
                <a className='text-3xl text-red-500 font-bold'>
                    NextFlix
                </a>
            </Link>

            <div className='flex items-center gap-2'>
                <input
                    type="text"
                    placeholder='Buscar filmes'
                    className="h-8 pl-2 text-black rounded-sm outline-none"
                />

                <button
                    type="button"
                    className="flex justify-center items-center w-8 h-8 bg-red-500 hover:bg-transparent border-red-500 hover:border-2 hover:border-red-600 rounded-sm transition duration-300"
                >
                    <GoSearch className='w-4 h-4 text-white' />
                </button>
            </div>
        </div>
    );
};

export default NavBar;
