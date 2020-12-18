import React, { useState } from "react";
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {

  const [countries, setCountries] = useState(["USA", "INDIA", "IRELAND"])

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
          countries.map(country => (<MenuItem value={country}>{country}</MenuItem>))
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
