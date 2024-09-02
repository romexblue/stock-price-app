import { useState } from "react";
import axios from "axios";
import { StockData } from "./types/StockDataType";
import StockCard from "./Components/StockCard";

function App() {
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [isLoading, setIsloading] = useState(false);

    const getData = async (symbol: string) => {
        try {
            setIsloading(true);
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await axios.get(
                `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
            );
            setStockData(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsloading(false);
        }
    };

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const form = e?.target as HTMLFormElement;
        const { value } = form?.elements?.namedItem(
            "symbol"
        ) as HTMLInputElement;

        getData(value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mb-2">
                <form
                    onSubmit={handleSubmitSearch}
                    className="flex flex-col space-y-4"
                >
                    <input
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Stock Symbol"
                        name="symbol"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Loading...
                            </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
            {stockData && <StockCard data={stockData} />}
        </div>
    );
}

export default App;
