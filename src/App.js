import './App.css';
import Header from './components/Header';
import Country from './components/Country';
import { useState, useEffect } from 'react';
import axios from 'axios';
import chevrondown from './chevron-down-outline.svg';

function App() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");

  const fetchAll = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    }).catch(err => {
      setCountries("");
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
      <Header />
      <div className="container flex-center filters">
        <input type="text" id="country" placeholder="Search for a country..." onChange={filterByName} />
        <select id="region" defaultValue={region} onChange={filterByRegion} style={{ background: 'url('+chevrondown+') no-repeat right 15px center #fff' }}>
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="container countries">
        {countries && countries.map(country => <Country country={country} key={country.alpha3Code} />)}
        {countries.length === 0 && "There is no country with this name."}
      </div>
    </div>
  );
}

export default App;
