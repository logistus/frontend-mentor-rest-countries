function Country({ country }) {
  return (
    <div className="country">
      <div className="country-flag" style={{ backgroundImage: `url(${country.flag})` }}>
      </div>
      <div className="country-info">
        <h2>{country.name}</h2>
        <div><strong>Population: </strong>{country.population.toLocaleString()}</div>
        <div><strong>Region: </strong>{country.region}</div>
        <div><strong>Capital: </strong>{country.capital}</div>
      </div>
    </div>
  );
}

export default Country;