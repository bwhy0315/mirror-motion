import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "513adddb0168bd5149e9dc0d91bac7dc";
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
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            fontWeight: 'bold',
            position: 'relative', // 상대적 위치 설정
          }}
        >
          {/* 이미지 중앙 정렬 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // 부모 컨테이너 너비를 100%로 설정
            }}
          >
            <img
              src="./img/logo.jpg"
              style={{
                maxWidth: '25%',
                height: 'auto',
              }}
              alt="Logo"
            />
          </Box>

          {/* 날씨 및 시간 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'absolute',
              right: '20px',
            }}
          >
            <Box
              sx={{
                background: '#3897f2',
                borderRadius: 100,
                fontSize: '1.4rem',
                fontWeight: 'bold',
                width: '80px',
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: '40px',
                height: '40px',
              }}
            >
              {weatherData.temp !== null ? `${weatherData.temp}℃` : "Loading..."}
            </Box>
            <Box
              sx={{
                background: '#000000',
                borderRadius: 100,
                fontSize: '1.4rem',
                fontWeight: 'bold',
                width: '120px',
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: '40px',
                height: '40px',
              }}
            >
              {currentTime}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}