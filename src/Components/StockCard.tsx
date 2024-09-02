import { StockData } from "../types/StockDataType";

type Props = {
    data: StockData;
};

const StockCard = ({ data }: Props) => {
    const {
        c: currentPrice,
        d: priceChange,
        dp: priceChangePercent,
        h: highPrice,
        l: lowPrice,
        o: openPrice,
        pc: prevClosePrice,
        t: timestamp,
    } = data;

    //deep checks the object to ensure there are values
    const isStockNotFound =
        !currentPrice ||
        !openPrice ||
        !highPrice ||
        !lowPrice ||
        !prevClosePrice;
    if (isStockNotFound) {
        return (
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-red-500">
                        Stock Not Found
                    </div>
                    <p className="text-gray-700 text-base">
                        The stock symbol you entered does not exist or the data
                        is not available.
                    </p>
                </div>
            </div>
        );
    }

    const date = new Date(timestamp * 1000)?.toLocaleString();
    const isPositiveChange = priceChange >= 0;

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Stock Data</div>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Current Price:</strong> ${currentPrice?.toFixed(2)}
                </p>
                <p
                    className={`text-base mb-2 ${
                        isPositiveChange ? "text-green-500" : "text-red-500"
                    }`}
                >
                    <strong>Change:</strong> {priceChange?.toFixed(2)} (
                    {priceChangePercent?.toFixed(2)}%)
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>High:</strong> ${highPrice?.toFixed(2)}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Low:</strong> ${lowPrice?.toFixed(2)}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Open:</strong> ${openPrice?.toFixed(2)}
                </p>
                <p className="text-gray-700 text-base mb-2">
                    <strong>Previous Close:</strong> $
                    {prevClosePrice?.toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">
                    <strong>Timestamp:</strong> {date}
                </p>
            </div>
        </div>
    );
};

export default StockCard;
