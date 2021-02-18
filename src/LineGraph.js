import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

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
          // Include a dollar sign in the ticks
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


const buildChartData = (data, casesType) => {

  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
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
                backgroundColor: "#E91E63",
                borderColor: "#CC1034",
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
