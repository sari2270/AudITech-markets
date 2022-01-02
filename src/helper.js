// color for Change (red/green)
export const changeColor = (value) => {
  return value < 0 ? "danger" : "success";
};

// color for %Change (red/green)
export const changePercentColor = (value) => {
  return value.startsWith("-") ? "danger" : "success";
};

//flat the nested object, and rename keys (capital letters, spaces)
export const updateMarketData = (obj) => {
  const keyValues = Object.keys(obj).map((key) => {
    if (typeof obj[key] === "object") {
      obj[key] = `Fmt: ${obj[key].fmt} | Raw: ${obj[key].raw}`;
    }
    const newKey =
      key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

// sort CB - by order, for numbers
const numbersSorting = (numA, numB, newOrder) => {
  if (newOrder === "up") return numA - numB;
  if (newOrder === "down") return numB - numA;
};

// sort CB - by order, for strings
const stringsSorting = (stringA, stringB, newOrder) => {
  if (newOrder === "up") {
    return stringA > stringB ? 1 : stringB > stringA ? -1 : 0;
  } else if (newOrder === "down") {
    return stringA > stringB ? -1 : stringB > stringA ? 1 : 0;
  }
};

//helper: sort by sortType
const sortByType = (markets, sortType, newOrder) => {
  let sortingCB;
  switch (sortType) {
    case "Symbol":
      sortingCB = (a, b) => {
        const symbolA = a.symbol.toLowerCase().replace("^", "");
        const symbolB = b.symbol.toLowerCase().replace("^", "");
        return stringsSorting(symbolA, symbolB, newOrder);
      };
      break;
    case "Exchange":
      sortingCB = (a, b) => {
        const exchangeA = a.fullExchangeName.toLowerCase();
        const exchangeB = b.fullExchangeName.toLowerCase();
        return stringsSorting(exchangeA, exchangeB, newOrder);
      };
      break;
    case "Change":
      sortingCB = (a, b) => {
        const changeA = +a.regularMarketChange.fmt;
        const changeB = +b.regularMarketChange.fmt;
        return numbersSorting(changeA, changeB, newOrder);
      };
      break;
    case "%Change":
      sortingCB = (a, b) => {
        const chPercentA = +a.regularMarketChangePercent.fmt.replace(/%/g, "");
        const chPercentB = +b.regularMarketChangePercent.fmt.replace(/%/g, "");
        return numbersSorting(chPercentA, chPercentB, newOrder);
      };
      break;
    case "Price":
      sortingCB = (a, b) => {
        const priceA = +a.regularMarketPrice.fmt.replace(/,/g, "");
        const priceB = +b.regularMarketPrice.fmt.replace(/,/g, "");
        return numbersSorting(priceA, priceB, newOrder);
      };
      break;
    default:
      break;
  }
  return markets.sort(sortingCB);
};

// final sort function: sort by type and order
export const sortByTypeAndOrder = (
  sortType,
  sortCases,
  originalMarkets,
  markets
) => {
  let newOrder;
  let sortedMarkets;
  if (sortCases[sortType] === "down") {
    newOrder = "default";
    sortedMarkets = [...originalMarkets];
  } else {
    if (sortCases[sortType] === "default") newOrder = "up";
    else if (sortCases[sortType] === "up") newOrder = "down";
    sortedMarkets = sortByType(markets, sortType, newOrder);
  }
  return { newOrder, sortedMarkets };
};
