import { changeColor, changePercentColor } from "../../helper";

const MarketRow = ({ market, setSingleMarket }) => {
  const {
    symbol,
    fullExchangeName: name,
    regularMarketChange: change,
    regularMarketChangePercent: changePercent,
    regularMarketPrice: price,
  } = market;
  return (
    <tr
      className="pointer"
      onClick={() => setSingleMarket({ ...market })}
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <th scope="row">{symbol}</th>
      <td>{name}</td>
      <td className={`fw-bold text-${changeColor(change.fmt)}`}>
        {change.fmt}
      </td>
      <td className={`fw-bold text-${changePercentColor(changePercent.fmt)}`}>
        {changePercent.fmt}
      </td>
      <td>{price.fmt}</td>
    </tr>
  );
};

export default MarketRow;
