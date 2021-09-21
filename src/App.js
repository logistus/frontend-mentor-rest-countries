import './App.css';
import Country from './components/Country';
import { useState, useEffect, useContext } from 'react';
import {ThemeContext} from './Provider';
import axios from 'axios';
import chevrondown from './chevron-down-outline.svg';
import chevrondownWhite from './chevron-down-outline-white.svg';
import search from './search-outline.svg';
import searchWhite from './search-outline-white.svg';
import { Link } from 'react-router-dom';

function App() {
  let [countries, setCountries] = useState([]);
  let [region, setRegion] = useState("");
  let [loading, setLoading] = useState(true);
  const {theme} = useContext(ThemeContext);

  const fetchAll = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
      setLoading(false);
    }).catch(err => {
      setCountries("");
      setLoading(false);
      console.error(err);
    });
  }

  useEffect(() => {
    fetchAll()
  }, []);

  const filterByRegion = (e) => {
    if (e.target.value !== "") {
      setRegion(e.target.value);
      axios.get('https://restcountries.eu/rest/v2/region/'+e.target.value).then(response => {
        setCountries(response.data);
      }).catch(err => {
        setCountries("");
        console.error(err);
      });
    } else {
      setRegion("");
      fetchAll();
    }
  }

  const filterByName = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      axios.get('https://restcountries.eu/rest/v2/name/'+e.target.value).then(response => {
        setCountries(response.data);
      }).catch(err => {
        setCountries("");
        console.error(err);
      });
    } else {
      fetchAll();
    }
  }
  
  return (
    <div>
      <div className="container flex-center filters">
        <input type="text" id="country" className={`${theme}`} placeholder="Search for a country..." onChange={filterByName} style={{ background: 'url('+(theme === "light" ? search : searchWhite)+') no-repeat left 15px center' }} />
        <select id="region" className={`${theme}`} defaultValue={region} onChange={filterByRegion} style={{ background: 'url('+(theme === "light" ? chevrondown : chevrondownWhite)+') no-repeat right 15px center' }}>
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="container countries">
        {loading && <div>Loading...</div>}
        {countries && !loading && countries.map(country => <Link to={country.alpha3Code} key={country.alpha3Code}><Country country={country} /></Link>)}
        {countries.length === 0 && !loading && "There is no country with this name."}
      </div>
    </div>
  );
}

export default App;
