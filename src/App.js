import React, { useState, useEffect } from "react";
import InfoBox from './InfoBox'
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  useEffect(() =>{
    const getCountryData = async () =>{
      await fetch ('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data)=>{
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));
        setCountries(countries);
      })
    };
    getCountryData();
  }, [countries]);

  const onCountrySelect = (event) =>{
  const countryCode = event.target.value;
  setCountry(countryCode)
  }

  return (
    <div className="App">

      <div className="header">        
      <h1>COVID-19 Tracker</h1>
      <FormControl className="Dropdown">
        <Select variant="outlined" value={country} onChange={onCountrySelect}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
        {
          countries.map(country => (<MenuItem value={country.value}>{country.name}</MenuItem>))
        }
        </Select>
        </FormControl>
    </div>

        <div className="Stats">
        <InfoBox title='COVID Cases' cases={47} total={30000}/>
        <InfoBox title='Recovered' cases={47} total={20000}/>
        <InfoBox title='Deaths' cases={47} total={20000}/>
        </div>


      {/* {Table} */}

      {/* {Graph} */}
      {/* Map */}
    </div>
  );
}

export default App;
