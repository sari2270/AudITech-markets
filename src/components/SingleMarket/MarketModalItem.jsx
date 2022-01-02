const MarketModalItem = ({ k, marketData }) => {
  return (
    <li className="list-group-item">
      <span className="text-warning">{k}</span>
      <span className="text-secondary float-end">
        {marketData[k].toString()}
      </span>
    </li>
  );
};

export default MarketModalItem;
