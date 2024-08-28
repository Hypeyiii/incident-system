"use client";

import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const ChartComponent = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#fc0a37",
      textColor = "black",
      areaTopColor = "#f095a5",
      areaBottomColor = "#e01439",
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const container = chartContainerRef.current as HTMLDivElement;
        chart.applyOptions({ width: container.clientWidth });
      }
    };

    const chart = createChart(
      chartContainerRef.current as unknown as HTMLDivElement,
      {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width:
          (chartContainerRef.current as unknown as HTMLDivElement)
            ?.clientWidth || 0,
        height: 300,
      }
    );
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};
