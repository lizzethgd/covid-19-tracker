import React, { useState, useEffect} from "react";
import "./App.css";
import { FormControl, Select, Card, CardContent, Paper, Switch, FormControlLabel} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Footer from './Footer'
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData } from "./util";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Sun from './sun.png'
import Moon from './moon.png'


const App = () => {
  const [lightMode, setLightMode] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: lightMode ? 'light' : 'dark'
    }
  })

  const [inputCountry, setInputCountry] = useState("worldwide"); 
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [vaccineInfo, setVaccineInfo] = useState([])
  const [mapVaccine, setMapVaccine] = useState([]);
  
  
  
 const getAll = async ()  => { 
  setMapCenter([28.921631, 1.298191])
  setMapZoom(3)
  await fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data);
    setInputCountry("worldwide") 
  });
  await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=2`)
  .then((response) => response.json())
  .then((data) => {
    const entries = (Object.entries(data))
    setVaccineInfo({date: entries[1][0], vaccinated: entries[1][1] , todayVaccinated :entries[1][1] - entries[0][1] })
    }
  );

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
        todayCases: country.todayCases, todayDeaths: country.todayDeaths, todayRecovered:country.todayRecovered
      }));
      const sortedData = sortData(countriesInfo);
      setCountries(countries);
      setMapCountries(countriesInfo);
      setTableData(sortedData);
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
    }) ;
   
};


const getCountryData = async (country) => {
 
  await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = {
          country: data.country, cases: data.cases, flag: data.countryInfo.flag, 
          lat: data.countryInfo.lat, long: data.countryInfo.long,
          deaths: data.deaths, recovered: data.recovered, updated: data.updated,
          todayCases: data.todayCases, todayDeaths: data.todayDeaths, todayRecovered:data.todayRecovered
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

const objArraysJoin = (x, y) => {
  if (Array.isArray(x)) {
    for (let i=0; i < x.length; i++ ){
      for (let j=0; j < y.length; j++ ){
      if ( x[i].country=== y[j].country){
        x[i].updateVaccine = y[j].date
        x[i].vaccinated = y[j].vaccinated
        x[i].todayVaccinated = y[j].todayVaccinated
        y.splice(j,1)
        }
      }
    }
  } else {
    if ( x.country=== y.country){
      x.updateVaccine = y.date
      x.vaccinated = y.vaccinated
      x.todayVaccinated = y.todayVaccinated    
  }
}
console.log(x)
return x
}


  useEffect(() => {
    getAll()
    getCountriesData(); 
  }, []);

  const onCountryChange = async (e) => {

   const country = e.target.value
   
   if (country !== "worldwide") {
    getCountryData(country)
   } 
   else {
    getAll()
    getCountriesData() 
   }

   setInputCountry(country) 
  }
 


  return (
    <ThemeProvider theme={theme}>
      <Paper style={{height: '100vh'}}>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>COVID-19 Tracker</h2> 
          <FormControlLabel
          value="start"
          control={<Switch checked={lightMode} checkedIcon={<img src={Moon} alt='sun' width='26' height='26'/>} icon={<img src={Sun} alt='moon' width='26' height='26'/>} onChange={e=>setLightMode(!lightMode)} color="primary"/>}
          label= 'Light / Dark'
          labelPlacement="start"
        />
          
          <FormControl className="app__dropdown">
          <Select 
              native
              value={inputCountry}
              onChange={onCountryChange}
              variant='outlined'
            >
              <option value="worldwide"> Worldwide</option>
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
            cases={countryInfo.todayCases} 
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("recovered")}}
            title="Recovered"
            isGreen
            active={casesType === "recovered"}
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("deaths")}}
            title="Deaths"
            isPurple
            active={casesType === "deaths"}
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
            updated={countryInfo.updated}
          />
          <InfoBox
            onClick={e => {setCasesType("vaccinated") }}
            title="Vaccinated"
            isBlue
            active={casesType === "vaccinated"}
            total={vaccineInfo.vaccinated}
            cases={ vaccineInfo.todayVaccinated}
            updated={vaccineInfo.date }
          />
        </div>
        <Map
          countries={objArraysJoin(mapCountries, mapVaccine )}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Infected by Country</h3>
            <Table countries={tableData} />
            <br/>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer />
    </Paper>
    </ThemeProvider>
  
  );
};

export default App;

  /* let urlOne = "https://disease.sh/v3/covid-19/all"

  let urlTwo = "https://covid19.mathdro.id/api/countries"

  let urlThree = `https://disease.sh/v3/covid-19/countries/${country}` 

  let urlFour =  "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1"

  let urlFive = "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1"

  let urlSix = `https://disease.sh/v3/covid-19/countries/${country}?lastdays=1` */
  
 /*    const minimalSelectClasses = useMinimalSelectStyles();
  
    const iconComponent = (props) => {
      return (
        <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon}/>
      )};
  
    // moves the menu below the select input
    const menuProps = {
      classes: {
        paper: minimalSelectClasses.paper,
        list: minimalSelectClasses.list
      },
      anchorOrigin: {
        vertical: "bottom",
          horizontal: "left"
      },
      transformOrigin: {
        vertical: "top",
          horizontal: "left"
      },
      getContentAnchorEl: null
    };
    
  import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
    
  const getAllVaccineData = async () => {
 
  await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=2`)
      .then((response) => response.json())
      .then((data) => {
        const entries = (Object.entries(data))
        setVaccine({date: entries[1][0], total: entries[1][1] , today :entries[1][1] - entries[0][1] })
        }
      );
}

const getCountriesVaccineData = async () => {
 
  await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=2`)
      .then((response) => response.json())
      .then((data) => {
        const countries= data.map((country) => ({
          name: country.country,
          date: ((Object.entries(country.timeline))[1][0]),
          total: (Object.entries(country.timeline))[1][1],
          today :(Object.entries(country.timeline))[1][1] - (Object.entries(country.timeline))[0][1]
        }));
        setMapVaccine(countries)
        } 
      ) ;
}
  
const getCountryVaccineData = async (country) => {
 
  await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=2`)
      .then((response) => response.json())
      .then((data) => {
        const country= {
          name: data.country,
          date: new Date((Object.entries(data.timeline))[1][0]),
          vaccinated: (Object.entries(data.timeline))[1][1],
          todayVaccinated  :(Object.entries(data.timeline))[1][1] - (Object.entries(data.timeline))[0][1]
        };
       
        } 
      );
}
   
  */