import React, { useState, useEffect} from "react";
import "./App.css";
import { FormControl, Select, Card, CardContent, Paper, Switch, FormControlLabel} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Footer from './Footer'
import LineGraph from "./LineGraph";
import Table from "./Table";
import {objetsArraysJoin } from "./util";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Sun from './sun.png'
import Moon from './moon.png'


const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })

  const [inputCountry, setInputCountry] = useState("Worldwide"); 
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [vaccineInfo, setVaccineInfo] = useState([])
  const [mapVaccine, setMapVaccine] = useState([]);
  const [tableVacData, setTableVacData] = useState([]);

  
 const getAll = async ()  => { 
  setMapCenter([28.921631, 1.298191])
  setMapZoom(3)
  await fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data);
    setInputCountry("Worldwide") 
  });
  await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=2`)
  .then((response) => response.json())
  .then((data) => {
    const entries = (Object.entries(data))
    setVaccineInfo({date: entries[1][0], vaccinated: entries[1][1] , todayVaccinated :entries[1][1] - entries[0][1] })
    });
 }

 const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries= data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const countriesInfo = data.map((country) => ({
        country: country.country, cases: country.cases, flag: country.countryInfo.flag, 
        lat: country.countryInfo.lat, long: country.countryInfo.long, 
        deaths: country.deaths, recovered: country.recovered, updated: country.updated,
        todayCases: country.todayCases, todayDeaths: country.todayDeaths, todayRecovered:country.todayRecovered, population: country.population
      }));
      setCountries(countries);
      setMapCountries(countriesInfo);
      setTableData(countriesInfo);
    });
    await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=2`)
      .then((response) => response.json())
      .then((data) => {
        const countries= data.map((country) => ({
          country: country.country,
          
          //entries: (Object.entries(country.timeline))
          date: (Object.entries(country.timeline))[1][0],
          vaccinated: (Object.entries(country.timeline))[1][1],
          todayVaccinated :(Object.entries(country.timeline))[1][1] - (Object.entries(country.timeline))[0][1]
        }));
        setMapVaccine(countries);
        setTableVacData(countries);
    }) 
  };


const getCountryData = async (country) => {
 
  await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = {
          country: data.country, cases: data.cases, flag: data.countryInfo.flag, 
          lat: data.countryInfo.lat, long: data.countryInfo.long,
          deaths: data.deaths, recovered: data.recovered, updated: data.updated,
          todayCases: data.todayCases, todayDeaths: data.todayDeaths, todayRecovered:data.todayRecovered, population: data.population
        }
        setInputCountry(country)
        setMapCountries(countryData);
        setCountryInfo(countryData);
        setMapCenter([countryData.lat, countryData.long]);
        setMapZoom(5)   
      });

      await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=2`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.message!=="No vaccine data for requested country or country does not exist") {
        const country= {
          country: data.country,
          date: new Date((Object.entries(data.timeline))[1][0]),
          vaccinated: (Object.entries(data.timeline))[1][1],
          todayVaccinated  :(Object.entries(data.timeline))[1][1] - (Object.entries(data.timeline))[0][1]
        };
        setVaccineInfo(country)
        setMapVaccine(country);
        } 
        else {
        setVaccineInfo({})
        setMapVaccine({});
        }
      });
  }

  useEffect(() => {
    getAll()
    getCountriesData(); 
  }, []);

  const onCountryChange = async (e) => {

   const country = e.target.value
   
   if (country !== "Worldwide") {
    getCountryData(country)
   } 
   else {
    getAll()
    getCountriesData() 
   }

   setInputCountry(country) 
  }
 
return (
  
<ThemeProvider theme={theme} >
  <Paper style={{height: '100%'}}>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>COVID-19 Tracker</h2>
          <span>Source: disease.sh</span> 
          <FormControlLabel
          value="start"
          control={<Switch checked={darkMode} checkedIcon={<img src={Moon} alt='Moon' width='26' height='26'/>} icon={<img src={Sun} alt='Sun' width='26' height='26'/>} onChange={e=>setDarkMode(!darkMode)} color="secondary"/>}
          label= 'Light/Dark Mode'
          labelPlacement="start"
          />     
          <FormControl className="app__dropdown">
          <Select 
              native
              value={inputCountry}
              onChange={onCountryChange}
              variant='outlined'
            >
              <option value="Worldwide"> Worldwide</option>
              {countries.map((country, i) => (
              <option  key={i} value={country.name}>{country.name}</option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={e => {setCasesType("cases")}}
            title="Infected"
            isRed
            active={casesType === "cases"}
            total={countryInfo.cases}
            population={countryInfo.population}
            cases={countryInfo.todayCases} 
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("recovered")}}
            title="Recovered"
            isGreen
            active={casesType === "recovered"}
            total={countryInfo.recovered}
            population={countryInfo.population}
            cases={countryInfo.todayRecovered}
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("deaths")}}
            title="Deaths"
            isPurple
            active={casesType === "deaths"}
            total={countryInfo.deaths}
            population={countryInfo.population}
            cases={countryInfo.todayDeaths}
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("vaccinated") }}
            title="Vaccinated"
            isBlue
            active={casesType === "vaccinated"}
            total={vaccineInfo.vaccinated}
            population={countryInfo.population}
            cases={ vaccineInfo.todayVaccinated}
            updated={vaccineInfo.date }
          />
        </div>
        <Map
          countries={objetsArraysJoin(mapCountries, mapVaccine )}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <div className='information'> 
          <Card >
            <CardContent>
              <Table casesType={casesType} data={objetsArraysJoin(tableData, tableVacData )} />
            </CardContent>
          </Card>
        </div>
        <div className='chart'>
          <Card >
           <CardContent>
            <LineGraph casesType={casesType} country={inputCountry} />         
           </CardContent>
          </Card>
        </div>
      </div> 
    </div>
    <Footer />   
  </Paper>
</ThemeProvider>  
);

};

export default App;
