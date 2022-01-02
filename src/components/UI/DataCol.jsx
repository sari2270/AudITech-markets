const DataCol = ({ children }) => {
  return (
    <div className="col-lg-6 col-md-12 col-sm-12">
      <ul className="list-group list-group-flush">{children}</ul>
    </div>
  );
};

export default DataCol;
