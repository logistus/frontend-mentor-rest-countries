import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {ThemeContext} from '../Provider';
import { Link } from 'react-router-dom';
import BorderButton from './BorderButton';
import axios from 'axios';

function CountryDetail() {
  let [details, setDetails] = useState("");
  let [loading, setLoading] = useState(true);
  let { country_code } = useParams();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    if (country_code !== "") {
      axios.get("https://restcountries.eu/rest/v2/alpha/"+country_code).then(response => {
        setDetails(response.data);
        setLoading(false);
      }).catch(error => {
        setDetails("");
        setLoading(false);
        console.log(error);
      })
    }
  }, [country_code]);

  return (
      <div className="container">
        <Link to="/" className={`back-button back-button-${theme}`}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Arrow Back</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg> Back</Link>
        {loading && <div>Loading...</div>}
        {details && !loading && 
        <div className={`details details-${theme}`}>
          <div className="details-flag">
            <img src={details.flag} alt={details.name} style={{ width: '560px' }} />
          </div>
          <div className="details-other">
            <h1>{details.name}</h1>
            <div className="details-panels">
              <div>
                <div><strong>Native Name: </strong>{details.nativeName}</div>
                <div><strong>Population: </strong>{details.population.toLocaleString()}</div>
                <div><strong>Region: </strong>{details.region}</div>
                <div><strong>Sub Region: </strong>{details.subregion}</div>
                <div><strong>Capital: </strong>{details.capital}</div>
              </div>
              <div>
                <div><strong>Top Level Domain: </strong>{details.topLevelDomain}</div>
                <div>
                  <strong>Currencies: </strong>{details.currencies.map(currency => <span key={currency.code}>{currency.name}</span>)}
                </div>
                <div>
                  <strong>Languages: </strong>
                    {details.languages.map((language, index) => <span key={language.iso639_1}>{language.name} {index < details.languages.length - 1 ? ", " : ""}</span>)}
                </div>
              </div>
            </div>
            <div className={`details-borders details-borders-${theme}`}>
                <strong>Border Countries:</strong> <div className="borders">{ details.borders.map(border => <BorderButton key={border} code={border} />) }</div>
              </div>
          </div>
        </div>
        }
        {!details && !loading && <p className="error">Invalid country code</p>}
      </div>
  );
}

export default CountryDetail;