import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { WeatherViewer } from "./components/WeatherViewer";

const URL = process.env.REACT_APP_WEATHER_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  // states
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState(null);
  console.log(process.env.REACT_APP_WEATHER_URL);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  },[]);
  // city search form
  const fetchCity = (e) => {
    e.preventDefault();
    axios
      .get(
        `${URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${citySearch}`
      )
      .then((res) => {
        if (!res.data.length) {
          alert("no city found");
          return;
        }
        setCityData(res.data[0]);
        setCitySearch("");
      })
      .catch((err) => {
        console.log(err.message);
        alert("something happens, please try again!");
      });
  };

  return (
    <div className="wrapper">
      <h1 className="headline">React Weather API App</h1>
      <h5 className="headline2">Made by Anh Ha</h5>
      <form
        className="form-group custom-form"
        autoComplete="off"
        onSubmit={fetchCity}
      >
        <label>Search for a city to get weather data</label>
        <div className="search-box">
          <input
            className="form-control"
            required
            placeholder="Enter city name..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            <Icon icon={search} size={22} />
          </button>
        </div>
      </form>
      {cityData && (
        <div style={{ padding: "10px", width: "100%" }}>
          <WeatherViewer cityData={cityData} />
        </div>
      )}
    </div>
  );
};

export default App;
