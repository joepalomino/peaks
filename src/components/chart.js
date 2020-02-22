import React, { useState } from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryStack,
  VictoryTheme,
  VictoryGroup,
  VictoryTooltip,
  VictoryBar
} from "victory";
import { formatLinearData, formatAvgData, } from "../utils/chart-format-helpers";

function Chart({ data, formatFilter }) {

  const formattedData = formatFilter === 'linear' ? formatLinearData(data) : formatAvgData(data)

  return (
    <>
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
        width={2000}
        height={700}
      >
        <VictoryStack colorScale={["tomato", "orange", "gold"]}>
          {formattedData.map((levelArr, idx) => (
            <VictoryBar key={idx} data={levelArr} interpolation={"basis"} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default Chart;
