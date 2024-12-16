import React from 'react';
import { Box, Typography } from '@mui/material';

const TitleHeader = ({ selectedTab, setSelectedTab }) => {
  const items = [
    { label: '데이터 통계', key: '데이터 통계' },
    { label: '송출 범위 설정', key: '송출 범위 설정' },
    { label: '데이터기반 결과', key: '데이터기반 결과' }
  ];

  const handleClick = (key) => {
    setSelectedTab(key); // 선택한 탭 상태 변경
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '7%',
          padding :'0px 0px 20px 80px',
          borderBottom: '8px solid #E7A276',
        }}
      >
        {items.map((item) => (
          <Typography
            key={item.key}
            sx={{
              fontSize: selectedTab === item.key ? '2.8rem' : '2.5rem',
              color: selectedTab === item.key ? '#FF6E0B' : '#CCCCCC',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => handleClick(item.key)}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default TitleHeader;
