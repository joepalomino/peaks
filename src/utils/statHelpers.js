import { format } from "date-fns";

export function addPeakValues(entryData) {
  return entryData.map(obj => {
    const { mood_level, focus_level, energy_level } = obj;
    const peak_level = mood_level + focus_level + energy_level;

    return { ...obj, peak_level };
  });
}

export function getHighestValue(entryObj, statName) {
  let highestValue = entryObj.reduce(
    (highest, curr, idx, arr) => {
      const val = curr[statName];

      return val > highest[0]
        ? [val, [idx]]
        : val === highest[0]
        ? [val, [...highest[1], idx]]
        : highest;
    },
    [-1, []]
  );

  if (highestValue[1].length > 1) {
    highestValue = highestValue[1].reduce(
      (highest, curr) => {
        const beforeVal = curr === 0 ? 0 : entryObj[curr - 1][statName];
        const afterVal =
          curr === entryObj.length - 1 ? 0 : entryObj[curr + 1][statName];
        const sum = beforeVal + afterVal;

        return sum > highest[0] ? [sum, curr] : highest;
      },
      [0, 0]
    );
  }

  return entryObj[highestValue[1]];
}
