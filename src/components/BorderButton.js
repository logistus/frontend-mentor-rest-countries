import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function BorderButton({ code }) {
  let [countryName, setCountryName] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/alpha/"+code).then(response => {
      setCountryName(response.data.name);
    }).catch(error => {
      console.log(error);
    });
  }, [code]);

  return (
    <Link to={code} key={code}>{countryName}</Link>
  );
}

export default BorderButton;