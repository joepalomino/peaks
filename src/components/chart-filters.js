import React, { useState } from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

const FilterContainer = styled.div `
  ${tw`flex`}
`

function ChartFilters({ selectedFilter, filters, onFilterChange }) {
  const handleFilterChange = e => onFilterChange(e.target.innerText)

  return (
    <FilterContainer>
      {filters.map((filter, idx) => (
        <div
          key={idx}
          style={{ color: selectedFilter === filter && "red" }}
          onClick={handleFilterChange}
        >
          {filter}
        </div>
      ))}
    </FilterContainer>
  );
}

export default ChartFilters
