import {ThemeContext} from '../Provider';
import { useContext } from 'react';

function Country({ country }) {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`country country-${theme}`}>
      <div className="country-flag" style={{ backgroundImage: `url(${country.flags.png})` }}>
      </div>
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <div><strong>Region: </strong>{country.region}</div>
        <div><strong>Capital: </strong>{country.capital}</div>
      </div>
    </div>
  );
}

export default Country;