import Link from 'next/link';
import { BsFillTelephoneFill, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div>
            <div className="flex justify-around h-52 bg-[#080808] pt-4">
                <div className='flex flex-col'>
                    <h2 className='inline-block text-lg font-bold'>
                        Sobre nós
                    </h2>

                    <span className='inline-block w-12 h-[2px] bg-red-700 mt-2 mb-2' />

                    <p className='max-w-[400px]'>
                        Eu sou um desenvolvedor Web Junior Full Stack. Esse é um dos meus projetos criado visando o aperfeiçoamento de minhas habilidades como programador, além da obtenção de conhecimento técnico e prático.
                    </p>
                </div>

                <div className='flex flex-col'>
                    <h2 className='inline-block text-lg font-bold'>
                        Contato
                    </h2>

                    <span className='inline-block w-12 h-[2px] bg-red-700 mt-2 mb-2' />

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                            <div className='flex justify-center items-center w-8 h-8 bg-zinc-900 rounded-full'>
                                <MdEmail className='w-5 h-5' />
                            </div>
                            matiasdario75@gmail.com
                        </div>

                        <div className='flex items-center gap-3'>
                            <div className='flex justify-center items-center w-8 h-8 bg-zinc-900 rounded-full'>
                                <BsFillTelephoneFill className='w-5 h-5' />
                            </div>
                            +55 (83) 98640-4371
                        </div>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h2 className='inline-block text-lg font-bold'>
                        Redes Sociais
                    </h2>

                    <span className='inline-block w-12 h-[2px] bg-red-700 mt-2 mb-2' />

                    <div className='flex gap-4'>
                        <Link
                            href='https://www.instagram.com/dariomatias_dev/'
                            legacyBehavior
                        >
                            <a className='flex justify-center items-center w-8 h-8 bg-zinc-900 rounded-full'>
                                <BsInstagram className='w-5 h-5' />
                            </a>
                        </Link>

                        <Link
                            href='https://github.com/dariomatias-dev/'
                            legacyBehavior
                        >
                            <a className='flex justify-center items-center w-8 h-8 bg-zinc-900 rounded-full'>
                                <BsGithub className='w-5 h-5' />
                            </a>
                        </Link>

                        <Link
                            href='https://twitter.com/matiasdario752/'
                            legacyBehavior
                        >
                            <a className='flex justify-center items-center w-8 h-8 bg-zinc-900 rounded-full'>
                                <BsTwitter className='w-5 h-5' />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center h-12 bg-black text-sm text-zinc-400">
                Copyright ©2023 | Criado por Dário Matias
            </div>
        </div>
    );
};

export default Footer;
