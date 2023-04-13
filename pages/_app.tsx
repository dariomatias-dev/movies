import type { AppProps } from "next/app";
import "@/styles/globals.css";

import { DataProvider } from "@/components/Context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DataProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </DataProvider>
    );
}
