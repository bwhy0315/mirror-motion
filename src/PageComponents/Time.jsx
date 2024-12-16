import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const Time = ({ setTime, selectedTime }) => {
  const [selected, setSelected] = useState(null);

  const morningTimes = [
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
  ];

  const afternoonTimes = [
    { label: '17:00', value: 17 },
    { label: '18:00', value: 18 },
    { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
  ];

  const toggleSelection = (value) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    setTime(newValue);
  };

  return (
    <Box
      sx={{
        mt: "1.3%",
        ml: "3.5%",
        textAlign: 'left',
      }}
    >
      <Box
          sx={{
            mb: 0.5 ,
            ml: '85px',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography
            component="div"
            sx={{
              fontSize: '2.925rem',
              fontWeight: 'bold',
            }}
          >
            시간
          </Typography>
          <Typography
            sx={{
              fontSize: '2.7rem',
              fontWeight: 'bold',
              color: '#ff6e0b',
              ml: 0.5,
              paddingBottom:'50px'
            }}
          >
            •
          </Typography>
        </Box>
      <Box sx={{ mt: 0.75, ml:'85px', display: 'flex', gap:3.5, flexWrap: 'wrap' }}>
        {morningTimes.map((time) => (
          <Button
            key={time.value}
            variant="contained"
            onClick={() => toggleSelection(time.value)}
            sx={{
              background: selected === time.value ? "#ff6e0b" : "#ffe8dc",
              color: selected === time.value ? "#ffffff" : "#ffc69f",
              borderRadius: 7,
              fontSize: 55,
              width: "200px",
              height: "90px",
              fontWeight: 'bold',
              boxShadow: 'none',
            }}
          >
            {time.label}
          </Button>
        ))}
      </Box>
      <Box sx={{ mt: 3, ml: '85px', display: 'flex', gap: 3.5, flexWrap: 'wrap' }}>
        {afternoonTimes.map((time) => (
          <Button
            key={time.value}
            variant="contained"
            onClick={() => toggleSelection(time.value)}
            sx={{
              background: selected === time.value ? "#ff6e0b" : "#ffe8dc",
              color: selected === time.value ? "#ffffff" : "#ffc69f",
              borderRadius: 7,
              fontSize: 55,
              width: "200px",
              height: "90px",
              fontWeight: 'bold',
              boxShadow: 'none',
            }}
          >
            {time.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Time;
