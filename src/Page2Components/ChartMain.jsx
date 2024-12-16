import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Box, Typography } from '@mui/material';

const ChartMain = ({ gender, times }) => {
  const [data, setData] = useState([]); // data 상태를 선언하여 컴포넌트 어디서든 접근 가능

  useEffect(() => {
    // times 배열 유효성 검사 및 gender 값 추출
    const chartData = Array.isArray(times)
      ? times.map(item => (gender === "female" ? item.female : item.male))
      : [];
    
    setData(chartData); // 데이터 상태 업데이트

    // 상위 3개의 큰 값을 찾아 해당 색상을 진하게 설정
    const sortedData = [...chartData].sort((a, b) => b - a); // 내림차순 정렬
    const topThreeValues = sortedData.slice(0, 3); // 상위 3개 값 가져오기

    const dynamicColors = chartData.map((value) =>
      topThreeValues.includes(value) ? '#FF4500' : '#FFA07A' // 상위 3개는 진한 색, 나머지는 기본 색
    );

    const options = {
      series: [
        {
          data: chartData,
        },
      ],
      chart: {
        height: 500,
        width: '80%',
        type: 'bar',
        toolbar: {
          show: false, // 메뉴 아이콘 제거
        },
      },
      colors: dynamicColors, // 동적으로 설정된 색상 배열
      plotOptions: {
        bar: {
          columnWidth: '35%',
          distributed: true,
          borderRadius: 20, // 상단만 둥글게 적용
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return;
        },
        offsetY: -45, // 텍스트를 더 위로 이동
        style: {
          fontSize: '20px',
          colors: ['#FFB583'],
          fontWeight: 'bold',
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
        ],
        labels: {
          style: {
            colors: '#FFB685',
            fontSize: '18px',
            fontWeight: 'bold',
          },
        },
      },
      yaxis: {
        labels: {
          show: false, // y축 텍스트 제거
        },
      },
      grid: {
        show: false,
      },
    };

    const chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();

    // Cleanup function
    return () => {
      chart.destroy();
    };
  }, [times, gender]);

  return (
    <div>
      <div id="chart" style={{ display: 'flex', justifyContent: 'center' }}></div>
      <Box
        sx={{
          ml: '-5px',
          display: 'flex',
          flexWrap: 'wrap', // 반응형 줄 바꿈
          justifyContent: 'center', // 중앙 정렬
          gap: '77px', // 요소 간의 간격
        }}
      >
        {data.map((value, index) => (
          <Typography
            key={index} // 고유 키 설정
            sx={{
              px: 1.5, // 좌우 패딩
              py: 0.5, // 상하 패딩
              fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, // 반응형 폰트 크기
              fontWeight: 'bold',
              border: '1px solid #FFB583', // 테두리 추가 (선택 사항)
              borderRadius: '5px', // 둥근 모서리
              textAlign: 'center',
            }}
          >
            {value}명
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default ChartMain;
