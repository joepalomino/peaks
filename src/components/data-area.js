import React, { useState } from "react";
import EntryChart from "./entry-chart";
import ChartFilters from "./chart-filters";
import CheckinForm from "./checkinForm";

function DataArea() {
  const [timeFilter, setTimeFilter] = useState("week");
  const [formatFilter, setFormatFilter] = useState("linear");

  const handleTimeFilterChange = timeFilter => setTimeFilter(timeFilter);
  const handleFormatFilterChange = formatFilter =>
    setFormatFilter(formatFilter);

  return (
    <>
      <ChartFilters
        onFilterChange={handleTimeFilterChange}
        filters={["day", "week"]}
        selectedFilter={timeFilter}
      />
      <ChartFilters
        onFilterChange={handleFormatFilterChange}
        filters={["linear", "avg"]}
        selectedFilter={formatFilter}
      />
      <EntryChart timeFilter={timeFilter} formatFilter={formatFilter} />
      <CheckinForm />
    </>
  );
}

export default DataArea;
