import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

export default function ButtonAppBar() {
  const [currentTime, setCurrentTime] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    tempMax: null,
    tempMin: null,
    humidity: null,
    description: null,
    icon: null,
  });

  // 현재 시간을 업데이트
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  // 날씨 데이터를 가져오는 함수
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "513adddb0168bd5149e9dc0d91bac7dc"; // 환경 변수 사용 시 process.env.REACT_APP_WEATHER_KEY
      const cityName = "degu";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        const data = response.data;
        setWeatherData({
          temp: Math.round(data.main.temp),
          tempMax: Math.round(data.main.temp_max),
          tempMin: Math.round(data.main.temp_min),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'none',
          borderBottom: '2px solid #000000',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: 43,
              color: '#ff6e0b',
              mr: 2,
            }}
          />
          <Typography
             sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
           데이터분석 결과
          </Typography>
          <Fab
            aria-label="add"
            sx={{
              mr: '2%',
              background: '#ff6e0b',
              '&:hover': {
                background: '#ff6e0b',
                boxShadow: 'none',
              },
              boxShadow: 'none',
            }}
          >
            <HomeIcon sx={{ color: '#FFFFFF', fontSize: 40 }} />
          </Fab>

          <Box
            sx={{
              background: '#3897f2',
              borderRadius: 100,
              fontSize: '1.7rem',
              fontWeight: 'bold',
              width: '7%',
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: '48px',
              height: '50px',
              mr:"2%"
            }}
          >
            {weatherData.temp !== null ? `${weatherData.temp}℃` : "Loading..."}
          </Box>

          <Box
            sx={{
              background: '#000000',
              borderRadius: 100,
              fontSize: '1.7rem',
              fontWeight: 'bold',
              width: '10%',
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: '48px',
              height: '50px',
            }}
          >
            {currentTime}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
