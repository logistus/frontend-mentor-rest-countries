function Country({ country }) {
  return (
    <div className="country">
      <img src={country.flag} alt={country.name} width={265} height={160} />
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