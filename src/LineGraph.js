import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { buildChartData, buildChartVacData } from "./util";
import './LineGraph'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label:  (tooltipItem, data) => {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks: {
          fontColor: '#2196F3',
          fontSize: 14
          
       },
    }
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: '#2196F3',
          fontSize: 14,
          callback:  (value, index, values) => {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const lineGraphColor = {
  cases: {
      borderColor: "#ff4500",
      backgroundColor: "#ff7518"
  },
  recovered: {
      borderColor: "#7dd71d",
      backgroundColor: "#7dd71d",
  },
  deaths: {
      borderColor: "#b452ff",
      backgroundColor: "#b452ff",
  },
  vaccinated: {
      borderColor: "#2196F3",
      backgroundColor: "#2196F3",
  }
}

const LineGraph= ({ casesType, country }) => {

const [chartData, setChartData] = useState({});


useEffect(() => {
  
const fetchData = async () => {
    
      if (country==='Worldwide'){
        if (casesType!=='vaccinated'){
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
          .then((response) => {return response.json()})
          .then((data) => {
            console.log(data)
            let toChartData = buildChartData(data, casesType);
            setChartData(toChartData)
          });
        }else {
        await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=120")
          .then((response) => {return response.json()})
          .then((data) => {
            let toChartData = buildChartVacData(data);
            setChartData(toChartData)
            });
          }
      }
        else{
          if (casesType!=='vaccinated'){
            await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`)
              .then((response) => {return response.json()})
              .then((data) => {
                let toChartData = buildChartData(data.timeline, casesType);
                setChartData(toChartData)
              });
          }else {
            await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=120`)
              .then((response) => {return response.json()})
              .then((data) => {
                if (data.message!=="No vaccine data for requested country or country does not exist") {
                let toChartData = buildChartVacData(data.timeline);
                setChartData(toChartData)
                }
                else{
                  setChartData({})  
                }
                });
              }
    
        }
    }
  
  fetchData();
  }, [casesType, country]);

return (
    <div>
      {chartData?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor:  { casesType } ? lineGraphColor[casesType].backgroundColor : "#E91E63",
                borderColor: { casesType } ? lineGraphColor[casesType].backgroundColor : "#CC1034",
                data: chartData,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
