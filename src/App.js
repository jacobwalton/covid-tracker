import React, { useState, useEffect } from "react";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import { sortData, prettyPrintStat } from './util';
import numeral from "numeral";
import LineGraph from './Components/LineGraph'
import "leaflet/dist/leaflet.css";
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
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");

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
          let sortedData = sortData(data)

          setTableData(sortedData);
          setMapCountries(data)
          setCountries(countries);
        });
    };
    getCountryData();
  }, []);

  const onCountrySelect = async (event) => {
    const countryCode = event.target.value;


      const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if(countryCode === "worldwide") {
          setMapCenter({lat : 34.80746, lng: -40.4796});
        }
        else {
          setMapCenter({lat : data.countryInfo.lat, lng : data.countryInfo.long});
        }
        setMapZoom(4);
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
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        <Map
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}/>
      </div>
      <Card className="appRight">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData}/>
          <br/>
          <h3>Worldwide new {casesType}</h3>
          
        </CardContent>
        <LineGraph casesType={casesType}/>
      </Card>
    </div>
  );
}

export default App;
