import { useState, useContext, createContext, ReactNode } from "react";

type PageDataProps = {
    page: number;
    amountPages: number;
};

type DataContextProps = {
    pageData: PageDataProps;
    changePageData: (changeProperty: string, value: number) => void;
    searchParams: string;
    changeSearchParams: (value: string) => void;
    resetPage: () => void;
};

const DataContext = createContext({} as DataContextProps);

type DataProviderProps = {
    children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
    const [pageData, setPageData] = useState({
        page: 1,
        amountPages: 1,
    });
    const [searchParams, setSearchParams] = useState("");

    // Atualiza os dados de "pageData" quando chamado.
    const changePageData = (changeProperty: string, value: number) => {
        setPageData((prevState) => {
            return { ...prevState, [changeProperty]: value };
        });
    };

    // Atualiza "searchParams" com um novo valor ao ser chamado.
    const changeSearchParams = (value: string) => setSearchParams(value);

    // Reseta o valor da página que deve ser exibida para 1 (página inicial).
    const resetPage = () => changePageData("page", 1);

    return (
        <DataContext.Provider
            value={{
                pageData,
                changePageData,
                searchParams,
                changeSearchParams,
                resetPage,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    return context;
};
