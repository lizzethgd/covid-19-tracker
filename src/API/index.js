import {useState} from 'react';  
  
const [country, setInputCountry] = useState("worldwide");
const [countryInfo, setCountryInfo] = useState({});
const [mapCenter, setMapCenter] = useState();
const [mapZoom, setMapZoom] = useState(3);
  
  export  const getCountriesNames = async () => {
    
    try {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (country.country));
        const sortedCountries = sortData(countries)
      });
    } 
    catch (error) {
      return error;
    }
    
  };

  export const fetchData = async (country) => {
  
   /*  if (country) {
      changeableUrl = `https://disease.sh/v3/covid-19/countries/${country}`;
    } */
  
    try {
        await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then((response) => response.json())
        .then((data) => {
          setInputCountry(country);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });

        return { country, countryInfo, mapCenter, mapCentere };
  }
    catch (error) {
      return error;
    }
  };