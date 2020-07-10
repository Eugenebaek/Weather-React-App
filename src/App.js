import React, {useState} from 'react';

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
    }
  };

  const dateBuilder = (prop) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[prop.getDay()];
    let date = prop.getDate();
    let month = months[prop.getMonth()];
    let year = prop.getFullYear();

    return `${day} ${date} ${month} ${year}`
  };

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App morning' : 'App') : 'App'}>
      <main>
        <div className={"search-box"}>
          <input
              type={"text"}
              className={"search-bar"}
              placeholder={"Search..."}
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
            <div>
              <div className={"location-box"}>
                <div className={"location"}>{weather.name}, {weather.sys.country}</div>
                <div className={"date"}>{dateBuilder(new Date())}</div>
              </div>
              <div className={"weather-box"}>
                <div className={"temp"}>{Math.round(weather.main.temp)}°C</div>
                <div className={"weather"}>{weather.weather[0].main}</div>
              </div>
            </div>
        ) : ("")}

      </main>
    </div>
  );
}

export default App;
