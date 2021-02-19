import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
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
          fontStyle: 'bold',
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
          fontStyle: 'bold',
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

const buildChartData = (data, casesType) => {

  let chartData = [];
  let lastDataPoint;

  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};



const LineGraph= ({ casesType }) => {

  const [data, setData] = useState({});
  console.log(casesType)

  const fetchData = async () => {
    if (casesType!=='vaccinated'){
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let chartData = buildChartData(data, casesType);
        setData(chartData)
        // buildChart(chartData);
      });
  }else {
    await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=120")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let chartData = buildChartData(data, casesType);
        setData(chartData)
        // buildChart(chartData);
      });
  }
}

  useEffect(() => {
    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor:  { casesType } ? lineGraphColor[casesType].backgroundColor : "#E91E63",
                borderColor: { casesType } ? lineGraphColor[casesType].backgroundColor : "#CC1034",
                data: data,
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
