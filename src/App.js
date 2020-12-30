import {useEffect, useState} from 'react'
import './App.css';
import './Table.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox'
import Map from './Map'
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  /* const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3); */


  const getCountriesData = async() =>{
    await fetch ('https://disease.sh/v3/covid-19/countries')
    .then(response => response.json() )
    .then(data => {
      
      const countries = data.map(country => ({
        name: country.country,          //'Finland', 'Peru', 'Spain'
        value: country.countryInfo.iso2 //'FI', 'PE', 'ES',
      }))

     const sortedData = sortData(data)
     setTableData(sortedData)
     setCountries(countries)
    })
  }

  useEffect(()=> {
    // useEffect = Runs a piece of code based on a given condition
    //The code inside here will run once when the component loads and not again
    //async -> send a request, wait for it, do something with
    fetch ('https://disease.sh/v3/covid-19/all')
    .then(response => response.json() )
    .then(data => setCountryInfo(data))
  },[])

  useEffect(()=> {
    getCountriesData()
  },[])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url =
    countryCode === 'worldwide'
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      //All of the data.. from the country response
      setCountryInfo(data)})

  }

  console.log(countryInfo)

  return (
    <div className="app">

      <div className='app_left'>
        <div className='app__header'>
        <h1>COVID-19 tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='worldwide'>Worlwide</MenuItem>
            { countries.map(country => (<MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>))}
          </Select>
        </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div> 
        <Map />
     </div>

     <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table className='table'countries={tableData}/>
          <h3> Worldwide New Cases</h3>
          {/* <LineGraph casesType={casesType} /> */}
        </CardContent>
     </Card>
   
    </div>
  );
}

export default App;