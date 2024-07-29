import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Grid, Typography } from '@mui/material';
import useScreenSize from '../../../Helpers/useScreenSize';

export default function Chart({
  xData,
  valueFormatter,
  topSeries,
  bottomSeries,
}) {
  const screenSize = useScreenSize();

  const xAxis = [
    {
      data: xData,
      valueFormatter,
      scaleType: 'utc',
      min: xData[0] ? xData[0] : 0,
      tickInterval: [],
    },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '90vw',
      }}
    >
      <Box
        sx={{
          height: '45%',
          width: '100%',
        }}
      >
        <LineChart
          margin={{
            bottom: 10,
            left: 30,
            right: 0,
          }}
          sx={{
            '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
              display: 'none',
            },
            '& .MuiLineElement-root': {
              width: '80px',
            },
          }}
          xAxis={xAxis}
          series={topSeries}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
            },
            popper: {
              sx: {
                '& .MuiChartsTooltip-root': {
                  '& .MuiTypography-root': {
                    color: 'black',
                  },
                },
              },
            },
          }}
        />
      </Box>
      <Grid
        container
        direction="row"
        columns={20}
        sx={{
          width: '100%',
          paddingLeft: '30px',
          paddingRight: 0,
        }}
      >
        {xData.map((data, i) => {
          const date = new Date(data);
          return i % 2 ? (
            <Grid key={i} item xs={1}>
              <Box
                sx={{
                  paddingY: '15px',
                  marginY: '-15px',
                  borderLeft: '1px solid black',
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  {`${date.getUTCHours()}:00`}
                </Typography>
                <Typography
                  sx={{ textAlign: 'center' }}
                >{`${date.getUTCDate()}-${date.getUTCMonth() + 1}`}</Typography>
              </Box>
            </Grid>
          ) : null;
        })}
      </Grid>
      <Box
        sx={{
          height: '45%',
          width: '100%',
        }}
      >
        <LineChart
          margin={{
            top: 10,
            left: 30,
            right: 0,
          }}
          yAxis={[{ reverse: true }]}
          xAxis={xAxis}
          series={bottomSeries}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
            },
            popper: {
              sx: {
                '& .MuiChartsTooltip-root': {
                  '& .MuiTypography-root': {
                    color: 'black',
                  },
                },
              },
            },
          }}
          bottomAxis={null}
          topAxis={{}}
          sx={{
            '& .MuiChartsAxis-top .MuiChartsAxis-tickLabel': {
              display: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
}
