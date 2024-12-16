import React from 'react';
import { Box, Typography } from '@mui/material';
//
const ResultComponent = ({recommendText}) => {
  return (
    <Box>
      {/* 헤더 부분 */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #ff6e0b, #ffffff)',
          padding: '20px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '5px',
          mt: 15,
        }}
      >
        <Typography
          sx={{
            marginLeft: '50px',
            fontSize: 35,
            fontWeight: 'bold',
          }}
        >
          데이터를 기반한 송출 광고 추천
        </Typography>
      </Box>

      {/* 설명 부분 */}
      <Box
        sx={{
          marginTop: '20px',
          marginLeft: '60px',
          lineHeight: '1.8',
          textAlign: 'left',
        }}
      >
        <Typography component="span" sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          추출된 데이터를 기반하여 시술고객님께 아래{' '}
        </Typography>
        <Typography
          component="span"
          sx={{
            color: '#ff6e0b',
            fontWeight: 500,
            fontSize: '1.8rem',
          }}
        >
          텍스트
        </Typography>
        <Typography component="span" sx={{ fontSize: '1.8rem', fontWeight: 500 }}>
          를 포함한 광고를 송출합니다.
        </Typography>
      </Box>

      {/* 버튼 부분 */}
      <Box
        sx={{
          display: 'flex',
          width: '95%',
          gap: '35px', // 버튼 간격 설정
          marginTop: '40px',
          marginLeft: '60px',
        }}
      >
        <Typography
          sx={{
            fontSize: '2.6rem',
            fontWeight:'bold'
          }}
        >
          {recommendText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultComponent;