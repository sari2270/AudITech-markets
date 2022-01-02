import DataCol from "../UI/DataCol";
import MarketModalItem from "./MarketModalItem";
import { updateMarketData } from "../../helper";

const MarketModal = ({ singleMarket }) => {
  const updatedSingleMarket = singleMarket && updateMarketData(singleMarket);

  const dataMid =
    singleMarket && Math.ceil(Object.keys(singleMarket).length / 2);

  const generateCol = (...sliceParams) => {
    return Object.keys(updatedSingleMarket)
      .slice(...sliceParams)
      .map((k, index) => (
        <MarketModalItem key={index} k={k} marketData={updatedSingleMarket} />
      ));
  };
  const col1 = generateCol(0, dataMid);
  const col2 = generateCol(dataMid);

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className="modal-title text-warning text-center m-auto me-5 ps-5"
                id="exampleModalLabel"
              >
                {singleMarket.symbol}
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <DataCol>{col1}</DataCol>
                  <DataCol>{col2}</DataCol>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning text-white"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketModal;
