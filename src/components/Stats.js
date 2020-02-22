import React from "react";
import { addPeakValues, getHighestValue } from "../utils/statHelpers";
import format from "date-fns/format";

function Stats({ entryData }) {
  const updatedData = addPeakValues(entryData);

  const levels = ["energy_level", "mood_level", "focus_level"];

  return (
    <div>
      <div>
        <div>Your peak time:</div>
        <div>
          {format(
            new Date(getHighestValue(updatedData, "peak_level").created_at),
            "h b"
          )}
        </div>
      </div>
      {levels.map((level, idx) => (
        <div key={idx}>
          <div>Highest {level}:</div>
          <div>
            {format(
              new Date(getHighestValue(entryData, level).created_at),
              "h b"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
