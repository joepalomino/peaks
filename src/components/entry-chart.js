import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useAuth0 } from "../contexts/auth0-context";
import { sub, formatISO } from "date-fns";
import CheckinForm from "./checkinForm";
import Stats from "./Stats";
import Chart from "./chart";
import { FETCH_ENTRIES } from '../utils/queries'


const timeFilterMap = {
  day: 1,
  week: 7
};

function EntryChart({timeFilter, formatFilter}) {


  const { user } = useAuth0();

  let { loading, error, data } = useQuery(FETCH_ENTRIES, {
    variables: {
      userId: user.sub,
      filter: formatISO(sub(new Date(), { days: timeFilterMap[timeFilter] }))
    }
  });


  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>


      <Chart data={data.Entry} formatFilter={formatFilter}/>
      <Stats entryData={data.Entry} />
    </div>
  );
}

export default EntryChart;
