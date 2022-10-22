import axios from "axios";
import React, { useEffect, useState } from "react";
import moon from "../images/moon.png";
import sun from "../images/sun.png";

import { PushSpinner } from "react-spinners-kit";

const URL = process.env.REACT_APP_WEATHER_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const WeatherViewer = ({ cityData }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setData(null);
    setLoading(true);
    axios
      .get(`${URL}/currentconditions/v1/${cityData.Key}?apikey=${API_KEY}`)
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      });
  }, [cityData.Key]);

  return (
    <>
      {data ? (
        <main className="current-conditions-box">
          <h3 className="city-country">
            {cityData.EnglishName} {cityData.Country.EnglishName}
          </h3>
          <div className="details">
            <h2 className="temperature-value">
              {Math.ceil(data.Temperature.Metric.Value)}
              <sup className="deg">&deg;{data.Temperature.Metric.Unit}</sup>
            </h2>
            {data.IsDayTime === true ? (
              <img className="weather-img" src={sun} alt="sun" />
            ) : (
              <img className="weather-img" src={moon} alt="moon" />
            )}
            <p className="weather-text">{data.WeatherText}</p>
          </div>
        </main>
      ) : (
        <div className="loader-box">
          <PushSpinner size={30} color="#fff" loading={loading} />
        </div>
      )}
    </>
  );
};
