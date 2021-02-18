import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort(
        (a, b) => (a.cases > b.cases ? false : true)
    )
}

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

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
            Infected: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
          <div className="info-vaccinated">
           Vaccinated: {country.vaccinated  ? numeral(country.vaccinated).format("0,0") : 'No data'}
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
        Infected: {numeral(country.cases).format("0,0")}
      </div>
      <div className="info-recovered">
        Recovered: {numeral(country.recovered).format("0,0")}
      </div>
      <div className="info-deaths">
        Deaths: {numeral(country.deaths).format("0,0")}
      </div>
      <div className="info-vaccinated">
        Vaccinated: {country.vaccinated?  numeral(country.vaccinated).format("0,0") : 'No data'}
        </div>
    </div>
  </Popup>
</Circle>
     
  
 