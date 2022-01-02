import { useEffect, useState } from "react";

import MarketModal from "../SingleMarket/MarketModal";
import Loading from "../Loading";
import Error from "../Error";
import MarketRow from "./MarketRow";
import SortOrderIcon from "./SortOrderIcon";
import { sortByTypeAndOrder } from "../../helper";
import { headerCells } from "../../constants";

import axios from "axios";

const options = {
  url: "https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US",
  params: { modules: "defaultKeyStatistics,assetProfile" },
  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
};

const initialSortCases = {
  Exchange: "default",
  Symbol: "default",
  Change: "default",
  "%Change": "default",
  Price: "default",
};

let originalMarkets;

const MarketsTable = () => {
  const [markets, setMarkets] = useState([]);
  const [singleMarket, setSingleMarket] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCases, setSortCases] = useState({ ...initialSortCases });

  useEffect(() => {
    const fetchMarketsHandler = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios(options);
        originalMarkets = response.data.marketSummaryResponse.result;
        setMarkets([...originalMarkets]);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };
    fetchMarketsHandler();
  }, []);

  const sortingHandler = (sortType) => {
    const { newOrder, sortedMarkets } = sortByTypeAndOrder(
      sortType,
      sortCases,
      originalMarkets,
      markets
    );
    setSortCases({ ...initialSortCases, [sortType]: newOrder });
    setMarkets([...sortedMarkets]);
  };

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <MarketModal singleMarket={singleMarket || {}} />
      <div className="table-responsive">
        <table className="table table-striped table-hover w-75 m-auto">
          <thead>
            <tr>
              {headerCells.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="pointer w-25"
                  onClick={() => sortingHandler(header.title)}
                >
                  {header.title}{" "}
                  <SortOrderIcon order={sortCases[header.title]} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {markets.length > 1 &&
              markets.map((market, index) => (
                <MarketRow
                  key={index}
                  market={market}
                  setSingleMarket={setSingleMarket}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MarketsTable;
