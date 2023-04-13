import { useState, useContext, createContext, ReactNode } from "react";

type PageDataProps = {
    page: number;
    amountPages: number;
};

type DataContextProps = {
    pageData: PageDataProps;
    changePageData: (changeProperty: string, value: number) => void;
    params: string;
    changeParams: (value: string) => void;
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
    const [params, setParams] = useState('');

    const changePageData = (changeProperty: string, value: number) => {
        setPageData((prevState) => {
            return { ...prevState, [changeProperty]: value };
        });
    };

    const changeParams = (value: string) => setParams(value);

    return (
        <DataContext.Provider
            value={{
                pageData,
                changePageData,
                params,
                changeParams,
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
