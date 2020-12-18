import React, { useState, useEffect } from "react";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import { sortData } from './util';
import LineGraph from './Components/LineGraph'
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent
} from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])


  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])
  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data)
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountryData();
  }, [countries]);

  const onCountrySelect = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  return (
    <div className="App">
      <div className="appLeft">
        <div className="header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="Dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountrySelect}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="Stats">
          <InfoBox
          title="COVID Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases} />

          <InfoBox
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered} />

          <InfoBox
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths} />

        </div>

        <Map />
      </div>
      <Card className="appRight">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
        </CardContent>
        <LineGraph />
        {/* {Graph} */}
      </Card>
    </div>
  );
}

export default App;
