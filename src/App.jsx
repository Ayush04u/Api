import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Chart from "react-apexcharts";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      },
    ]
  });

  useEffect(() => {
    axios.get("/data")
      .then(response => {
        const categories = response.data.data.map(employee => employee.employee_name);
        const data = response.data.data.map(employee => employee.employee_age);
        setChartData({
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories
            }
          },
          series: [
            {
              ...chartData.series[0],
              data: data
            }
          ]
        });
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Employee Age Chart</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="row">
        <div className="col-12">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="800"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
