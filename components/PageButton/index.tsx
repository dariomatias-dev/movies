import { Dispatch, SetStateAction } from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

type Props = {
    buttonType: string;
    amountPages?: number;
    buttonValue?: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
};

const PageButton = ({ buttonType, amountPages = 0, buttonValue = 1, page, setPage }: Props) => {
    const conditionNextPage = page >= amountPages ? true : buttonValue > amountPages && buttonValue !== 0;

    return (
        <button
            type='button'
            onClick={() => buttonType === 'previous' ? setPage(page - 1) : setPage(buttonValue === 1 ? page + buttonValue : buttonValue)}
            disabled={buttonType === 'previous' ? page === 1 : conditionNextPage}
            className='w-12 h-12 flex justify-center items-center bg-black hover:bg-[#0A0A0A] rounded-full transition duration-300 disabled:opacity-50 disabled:hover:bg-black disabled:cursor-not-allowed'
        >
            {
                buttonType === 'previous' && (
                    <MdOutlineArrowBackIos className='w-6 h-6' />
                )
            }

            {
                buttonType === 'next' && (
                    buttonValue === 1 ?
                        <MdOutlineArrowForwardIos className='w-6 h-6' />
                        :
                        buttonValue
                )
            }
        </button>
    );
};

export default PageButton;
