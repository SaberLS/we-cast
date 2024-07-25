import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Chart({ xData, series }) {
  return (
    <LineChart
      yAxis={[{ id: "temperature", scaleType: "linear" }]}
      xAxis={[
        {
          data: xData,
          valueFormatter: (el) => {
            const date = new Date(el * 1000);
            return `${date.getUTCHours()}:00 ${date.getUTCDate()}`;
          },
          scaleType: "utc",
          min: xData[0] ? xData[0] : 0,
        },
      ]}
      series={series.map((e) => {
        return {
          id: e.label,
          label: e.temeprature,
          data: e.data,
          showMark: false,
        };
      })}
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
  );
}
