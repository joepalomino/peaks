import { format, compareAsc } from "date-fns";

const calcAvg = sum => count => sum / count;

const calcArrSum = arr => arr.reduce((accu, curr) => accu + curr);

const formatToChartReadable = data =>
  data.reduce((acc, curr) => {
    const level = curr[0];
    //[mood, {'6am': [1, 6, 8]}]
    const m = Object.entries(curr[1]).reduce((acc, curr) => {
      //['6am', [1, 6, 8]]
      return [
        ...acc,
        {
          name: level,
          x: curr[0],
          y: calcAvg(calcArrSum(curr[1]))(curr[1].length)
        }
      ];
    }, []);

    return [...acc, m];
  }, []);

function sortEntriesPerHour(entries) {
  const sortedEntries = entries.sort((firstEntry, secondEntry) => {
    return parseInt(format(new Date(firstEntry.created_at), 'H')) - parseInt(format(new Date(secondEntry.created_at), 'H'))
  })
  const timeRange = [
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "noon",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM"
  ];

  return sortedEntries.reduce((acc, curr) => {
    const hour = format(new Date(curr.created_at), "h b");

    if (!timeRange.includes(hour)) {
      return acc;
    }

    return {
      ...acc,
      ...Object.entries(curr).reduce((accuObj, propAndKeyArr) => {
        if (!propAndKeyArr[0].includes("_level")) {
          return accuObj;
        }
        const name = propAndKeyArr[0].slice(0, propAndKeyArr[0].indexOf("_"));
        return {
          ...accuObj,
          [name]: {
            ...acc[name],
            [hour]: acc.hasOwnProperty(name)
              ? acc[name].hasOwnProperty(hour)
                ? [...acc[name][hour], propAndKeyArr[1]]
                : [propAndKeyArr[1]]
              : [propAndKeyArr[1]]
          }
        };
      }, {})
    };
  }, {});
}

export const formatLinearData = data => {
  const levels = Object.keys(data[0]).filter(key => key.includes("_level"));

  return data.reduce(
    (accu, curr) => {
      levels.forEach((name, idx) => {
        accu[idx] = [
          ...accu[idx],
          { name, x: new Date(curr.created_at), y: curr[name] }
        ];
      });

      return accu;
    },
    levels.map(elem => [])
  );
};

export const formatAvgData = data =>
  formatToChartReadable(Object.entries(sortEntriesPerHour(data)));
