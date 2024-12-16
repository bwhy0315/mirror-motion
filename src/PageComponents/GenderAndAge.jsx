import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

const GanderAndAge = ({ setGender, selectedGender, setAge, selectedAge }) => {
  const upperAgeGroups = [
    { label: '10대', value: '10대' },
    { label: '20대', value: '20대' },
    { label: '30대', value: '30대' },
  ];

  const lowerAgeGroups = [
    { label: '40대', value: '40대' },
    { label: '50대', value: '50대' },
    { label: '60대', value: '60대' },
    { label: '70+', value: '70+' },
  ];

  const toggleGenderSelection = (gender) => {
    const newGender = selectedGender === gender ? null : gender;
    setGender(newGender);
  };

  const toggleAgeSelection = (age) => {
    const newAge = selectedAge === age ? null : age;
    setAge(newAge);
  };

  return (
    <Box
      sx={{
        mt: "1.30%",
        ml: "3.9%",
        display: 'flex',
        gap: '25%',
        alignItems: 'flex-start',
      }}
    >
      {/* 성별 섹션 */}
      <Box sx={{ 
          textAlign: 'left',
          ml: '85px'
        }}>
        <Box
          sx={{
            mb: 0.5 ,
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
            성별
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
        
        <Box sx={{ mt: 0.5 }}>
          <Button
            variant="contained"
            onClick={() => toggleGenderSelection('female')}
            sx={{
              background: selectedGender === 'female' ? "#ff6e0b" : "#ffe8dc",
              color: selectedGender === 'female' ? "#ffffff" : "#ffc69f",
              borderRadius: 7,
              fontSize: 55,
              width: "195px",
              height: "90px",
              fontWeight: 'bold',
              boxShadow: 'none',
            }}
          >
            여성
          </Button>
          <Button
            variant="contained"
            onClick={() => toggleGenderSelection('male')}
            sx={{
              ml: 5.85,
              background: selectedGender === 'male' ? "#ff6e0b" : "#ffe8dc",
              color: selectedGender === 'male' ? "#ffffff" : "#ffc69f",
              borderRadius: 7,
              fontSize: 55,
              width: "195px",
              height: "90px",
              fontWeight: 'bold',
              boxShadow: 'none',
            }}
          >
            남성
          </Button>
        </Box>
      </Box>

      {/* 연령 섹션 */}
      <Box sx={{ 
          textAlign: 'left',
          ml: '-185px'
        }}>
        <Box
          sx={{
            mb: 0.5 ,
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
            연령
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
        <Box sx={{ mt: 0.5, display: 'flex', gap: 2.925 }}>
          {upperAgeGroups.map((group) => (
            <Button
              key={group.value}
              variant="contained"
              onClick={() => toggleAgeSelection(group.value)}
              sx={{
                background: selectedAge === group.value ? "#ff6e0b" : "#ffe8dc",
                color: selectedAge === group.value ? "#ffffff" : "#ffc69f",
                borderRadius: 7,
                fontSize: 55,
                width: "195px",
                height: "90px",
                fontWeight: 'bold',
                boxShadow: 'none',
              }}
            >
              {group.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ mt: 2.925, display: 'flex', gap: 2.925 }}>
          {lowerAgeGroups.map((group) => (
            <Button
              key={group.value}
              variant="contained"
              onClick={() => toggleAgeSelection(group.value)}
              sx={{
                background: selectedAge === group.value ? "#ff6e0b" : "#ffe8dc",
                color: selectedAge === group.value ? "#ffffff" : "#ffc69f",
                borderRadius: 7,
                fontSize: 55,
                width: "195px",
                height: "90px",
                fontWeight: 'bold',
                boxShadow: 'none',
              }}
            >
              {group.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GanderAndAge;
