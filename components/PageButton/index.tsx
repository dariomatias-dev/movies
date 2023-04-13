import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

import { useData } from '../Context';

type Props = {
    buttonType: string;
    buttonValue?: number;
};

const PageButton = ({ buttonType, buttonValue = 1 }: Props) => {
    const { pageData, changePageData } = useData();

    const conditionNextPage = pageData.page >= pageData.amountPages ?
        true
        :
        buttonValue > pageData.amountPages && buttonValue !== 0;

    return (
        <button
            type='button'
            onClick={() => buttonType === 'previous' ? changePageData('page', pageData.page - 1) : changePageData('page', buttonValue === 1 ? pageData.page + buttonValue : buttonValue)}
            disabled={buttonType === 'previous' ? pageData.page === 1 : conditionNextPage}
            className='w-12 h-12 flex justify-center items-center bg-black hover:bg-[#0A0A0A] rounded-full transition duration-300 disabled:opacity-50 disabled:hover:bg-black disabled:cursor-not-allowed'
        >
            {buttonType === 'previous' && <MdOutlineArrowBackIos className='w-6 h-6' />}

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
