import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import { theme } from '../../Themes/theme';

export default function Chart({
  xData,
  valueFormatter,
  topSeries,
  bottomSeries,
}) {
  const xAxis = [
    {
      data: xData,
      valueFormatter,
      scaleType: 'utc',
      min: xData[0] ? xData[0] : 0,
    },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '90vw',
        '& .MuiChartsAxis-line': {
          stroke: theme.palette.primary.main,
        },

        '& .MuiChartsAxis-tick': {
          stroke: theme.palette.primary.main,
        },
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
            bottom: 40,
            left: 40,
            right: 30,
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
                  backgroundColor: theme.palette.primary.main,
                  '& .MuiTypography-root': {
                    color: 'black',
                  },
                },
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          height: '45%',
          width: '100%',
        }}
      >
        <LineChart
          margin={{
            top: 5,
            left: 40,
            right: 30,
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
            //
            popper: {
              sx: {
                '& .MuiChartsTooltip-root': {
                  backgroundColor: theme.palette.primary.main,
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
            // Disable top tick labels
            '& .MuiChartsAxis-top .MuiChartsAxis-labelTick': {
              display: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
}
