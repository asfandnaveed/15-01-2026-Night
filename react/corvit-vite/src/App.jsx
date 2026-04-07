import { useEffect, useState } from 'react';
import './App.css'


function App() {


  const [weather , setWeather] = useState();
  const [isLoading , setIsLoading] = useState(true);

  const getweather = async ()=>{

    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=43297bb031ed4a1898b51508240909&q=Lahore");
    const data  = await response.json();
    setWeather(data);
    setIsLoading(false);
  };

  useEffect(()=>{
    getweather();
  } , []);

  if(isLoading){
    return(
      <h1>Loading ....</h1>
    );
  }

  return (
    <>
      
      <div className="container-fluid main-container">
        <div className="row g-4">
          {/* LEFT PANEL */}
          <div className="col-lg-4">
            <div className="weather-card">
              <div className="search-box">
                <input type="text" placeholder="Search city..." />
              </div>
              <div className="text-center weather-icon">
                <img src="images/cloud-rain.png" width={180} />
              </div>
              <h1 className="temp">{weather.current.temp_c}°C</h1>
              <div className="location-row">
                <span>Kuala Lumpur</span>
                <span>Monday</span>
                 </div>
              <hr />
              <div className="weather-desc">
                <p>Light Rain</p>
                <p>Min Temperature - 28°C</p>
                <p>Max Temperature - 31°C</p>
              </div>
              <div className="bottom-stats">
                <div>
                  <h4>83%</h4>
                  <p>Humidity</p>
                </div>
                <div>
                  <h4>6km/h</h4>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT PANEL */}
          <div className="col-lg-8">
            <div className="right-panel">
              <div className="tabs">
                <span>Today</span>
                <span className="active">Week</span>
              </div>
              {/* WEEK CARDS */}
              <div className="week-forecast">
                <div className="day-card">
                  <p>Sun</p>
                  <img src="images/clearDay.png" />
                  <h4>32°</h4>
                </div>
                <div className="day-card">
                  <p>Mon</p>
                  <img src="images/thunderstorm.png" />
                  <h4>31°</h4>
                </div>
                <div className="day-card">
                  <p>Tue</p>
                  <img src="images/windy.png" />
                  <h4>27°</h4>
                </div>
                <div className="day-card">
                  <p>Wed</p>
                  <img src="images/cloud-rain.png" />
                  <h4>31°</h4>
                </div>
                <div className="day-card">
                  <p>Thu</p>
                  <img src="images/heaveyRain.png" />
                  <h4>25°</h4>
                </div>
                <div className="day-card">
                  <p>Fri</p>
                  <img src="images/windyNight.png" />
                  <h4>26°</h4>
                </div>
                <div className="day-card">
                  <p>Sat</p>
                  <img src="images/clearNight.png" />
                  <h4>30°</h4>
                </div>
              </div>
              <h5 className="overview-title">Today's Overview</h5>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="info-card">
                    <p>Air Quality Index</p>
                    <h2>53</h2>
                    <span className="good">Good</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-card">
                    <p>UV Index</p>
                    <h2>{weather.current.uv}</h2>
                    <span className="moderate">Moderate</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-card">
                    <p>Pressure (hpa)</p>
                    <h2>1006</h2>
                    <span>Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
