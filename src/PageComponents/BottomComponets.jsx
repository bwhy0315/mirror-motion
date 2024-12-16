import React from 'react';
import { Box, Typography } from '@mui/material';

const BottomComponents = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb:20, // 상단 간격
      }}
    >
      {/* 상단 1/3 박스 */}
      <Box
        sx={{
          backgroundColor: '#BDBDBD', // 회색 배경
          borderRadius: '20px', // 둥근 모서리
          padding: '7px 25px', // 내부 여백
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2, // 아래 간격
        }}
      >
        <Typography
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#FFFFFF', // 흰색 텍스트
          }}
        >
          2/3
        </Typography>
      </Box>

      {/* 하단 Indicator 점들 */}
      <Box
        sx={{
          display: 'flex',
          gap: 1, // 점 사이 간격
        }}
      >
        {/* 활성화된 점 */}
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: '#BDBDBD', // 활성화된 회색
            borderRadius: '50%', // 완전한 원형
          }}
        />
        {/* 비활성화된 점 */}
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: '#E0E0E0', // 비활성화된 회색
            borderRadius: '50%',
          }}
        />
        {/* 비활성화된 점 */}
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: '#E0E0E0', // 비활성화된 회색
            borderRadius: '50%',
          }}
        />
      </Box>
    </Box>
  );
};

export default BottomComponents;