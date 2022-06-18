const CountryTable = ({ name, tcc, tdc, trc }) => {
  return (
    <div className="table_row">
      <p>{name}</p>
      <p>{Intl.NumberFormat("en-IN").format(tcc)}</p>
      <p>{Intl.NumberFormat("en-IN").format(trc)}</p>
      <p>{Intl.NumberFormat("en-IN").format(tdc)}</p>
    </div>
  );
};

export default CountryTable;
