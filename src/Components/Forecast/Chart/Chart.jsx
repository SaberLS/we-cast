import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

export default function Chart({ xData, valueFormatter, topSeries, bottomSeries }) {


  const xAxis = [
    {
      data: xData,
      valueFormatter: valueFormatter,
      scaleType: "utc",
      min: xData[0] ? xData[0] : false,
    },
  ]

  return (
    <Box>
      <Box sx={{
        height: "50vh",
        width: "90vw"
      }}>
        <LineChart
          margin={{
            bottom: 10,
          }}
          sx={{    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
            display: "none",
          },}}
          xAxis= {xAxis}
          series={topSeries}
          slotProps={{
            popper: {
              sx: {
                "& .MuiChartsTooltip-root": {
                  "& .MuiTypography-root": {
                    color: "black",
                  },
                },
              },
            },
          }}
        />
      </Box>
      <Box sx={{
        height: "50vh",
        width: "90vw"
      }}>
        <LineChart
          margin={{
            top: 30,
          }}
          yAxis={[{reverse: true}]}
          xAxis= {xAxis}
          series={bottomSeries}
          
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
            },
            popper: {
              sx: {
                "& .MuiChartsTooltip-root": {
                  "& .MuiTypography-root": {
                    color: "black",
                  },
                },
              },
            },
          }}
          bottomAxis={null}
          topAxis={{}}
        />
      </Box>
    </Box>
  );
}
