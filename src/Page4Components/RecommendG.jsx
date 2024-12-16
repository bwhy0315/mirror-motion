import React from 'react';
import { Box, Typography } from '@mui/material';
//
const RecommendG = ({gender ,age, time}) => {
  return (
    <div>
      <Box
        sx={{
          mt: '1.5%',
          ml: '3.5%',
          textAlign: 'left',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '2.3rem',
            fontWeight: 'bold',
          }}
        >
          텍스트 데이터 결과보고
        </Typography>
        <Box
          sx={{
            display: 'flex', 
            flexDirection: 'row',  
            gap: 3, // 버튼 사이 간격 설정
            mt: 5, // 제목과 버튼 그룹 사이 간격 추가
          }}
        >
          <Box
            sx={{
              borderRadius: 10,
              fontSize: 35,
              width: '170px',
              height: '70px',
              fontWeight: 'bold',
              background: '#ff6e0b',
              color: 'white',
              display: 'flex',  
              justifyContent: 'center',  
              alignItems: 'center',  
            }}
          >
            {gender}
          </Box>
          <Box
            sx={{
              borderRadius: 10,
              fontSize: 35,
              width: '170px',
              height: '70px',
              fontWeight: 'bold',
              background: '#FFB380',
              color: 'white',
              display: 'flex',  
              justifyContent: 'center',  
              alignItems: 'center',  
            }}
          >
            {age}
          </Box>
          <Box
            sx={{
              borderRadius: 10,
              fontSize: 35,
              width: '170px',
              height: '70px',
              fontWeight: 'bold',
              background: '#FFB380',
              color: 'white',
              display: 'flex',  
              justifyContent: 'center',  
              alignItems: 'center',  
            }}
          >
            {time}:00
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RecommendG;