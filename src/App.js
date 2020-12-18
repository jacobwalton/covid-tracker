import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {

  const [countries, setCountries] = useState([])

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

  return (
    <div className="App">

      <div className="header">        
      <h1>COVID-19 Tracker</h1>
      <FormControl className="Dropdown">
        <Select
        variant="outlined"
        value="abc"
        >
        {
          countries.map(country => (<MenuItem value={country.value}>{country.name}</MenuItem>))
        }

        </Select>
        </FormControl>
    </div>

      {/* {Title & Input dropdown} */}

      {/* {InfoBoxes} */}
      {/* {InfoBoxes} */}
      {/* {InfoBoxes} */}

      {/* {Table} */}

      {/* {Graph} */}
      {/* Map */}
    </div>
  );
}

export default App;
