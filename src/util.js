import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data, casesType) => {
  if(casesType!=='vaccinated'){
    const sortedData = [...data]
    return sortedData.sort(
        (a, b) => b[casesType] - a[casesType] )
    }
  else{
    const sortedData = data.filter(country => country[casesType]);
    return sortedData.sort(
      (a, b) => b[casesType] - a[casesType] )
  }
}

export const buildChartData = (data, casesType) => {
  let chartData = [];
  for (let date in data[casesType]) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] 
      };
      chartData.push(newDataPoint);
  }

return chartData;
};

export const buildChartVacData = (data) => {
  let chartData = [];
  for (let date in data) {
      let newDataPoint = {
        x: date,
        y: data[date]  
      };
      chartData.push(newDataPoint);
  }

return chartData;
};

export const objetsArraysJoin = (x, y) => {
  if (Array.isArray(x)) {
    for (let country  of x) {
      for (let j=0; j < y.length; j++ ){
      if ( country.country=== y[j].country){
        country.updateVaccine = y[j].date
        country.vaccinated = y[j].vaccinated
        country.todayVaccinated = y[j].todayVaccinated
        y.splice(j,1)
        }
      }
    }
  } 
  else {
    if ( x.country=== y.country){
      x.updateVaccine = y.date
      x.vaccinated = y.vaccinated
      x.todayVaccinated = y.todayVaccinated    
  }
  }
return x
} 

export const prettyPrintStat = (stat) =>
stat===0 ? 0 :  
  stat%1 === 0 ? numeral(stat).format('0,0') :
  stat%1 !== 0  ? numeral(stat).format('0.00') :
  "No data";

  const casesTypeColors = {
    cases: {
      hex: "#ff4500",
    //   rgb: "rgb(204, 16, 52)",
    //   half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#00e600",
    //   rgb: "rgb(125, 215, 29)",
    //   half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#682860",
    //   rgb: "rgb(251, 68, 67)",
    //   half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
    vaccinated: {
      hex: "#5C6BC0",
    //   rgb: "rgb(251, 68, 67)",
    //   half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    }
    
  };
  
export const showDataOnMap = (data, casesType = "cases") => 
  data.map((country) => (
    <Circle
      center={[country.lat, country.long]}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      fillOpacity={0.4}
      radius={
        country[casesType] 
        ? Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier 
        : 0
      }
      key={country.country}
    >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Infected: {prettyPrintStat(country.cases)}
            </div>
            <div className="info-recovered">
              Recovered: {prettyPrintStat(country.recovered)}
            </div>
            <div className="info-deaths">
              Deaths: {prettyPrintStat(country.deaths)}
            </div>
            <div className="info-vaccinated">
            Vaccinated: {country.vaccinated  ? prettyPrintStat(country.vaccinated) : 'No data'}
            </div>
          </div>
        </Popup>
    </Circle>
  ));


export const showCountryOnMap = (country, casesType = "cases") => 
  <Circle
    center={[country.lat, country.long]}
    pathOptions={{
      color: casesTypeColors[casesType].hex,
      fillColor: casesTypeColors[casesType].hex,
    }}
    fillOpacity={0.4}
    radius={ 
      country[casesType]
      ? Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier 
      : 0
    }
    key={country.country}
    >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Infected: {prettyPrintStat(country.cases)}
            </div>
            <div className="info-recovered">
              Recovered: {prettyPrintStat(country.recovered)}
            </div>
            <div className="info-deaths">
              Deaths: {prettyPrintStat(country.deaths)}
            </div>
            <div className="info-vaccinated">
              Vaccinated: {country.vaccinated ?  prettyPrintStat(country.vaccinated) : 'No data'}
              </div>
          </div>
        </Popup>
  </Circle>
     
  
 