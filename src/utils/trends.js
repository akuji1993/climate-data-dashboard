export const findTrends = (countryData, years = 10) => {
  if (years > 45 || years < 5) {
    years = 10;
  }
  const trends = [];

  // Trends are created in 10 year difference
  Object.keys(countryData[0]).forEach(key => {
    if (key !== "year") {
      const diff = getKeyDifference(countryData, key, years);
      if (diff > 1.2) {
        trends.push({
          category: key,
          type: "decrease",
          percentage: Math.round(Math.abs(diff - 1) * 100)
        });
      } else if (diff < 0.8) {
        trends.push({
          category: key,
          type: "increase",
          percentage: Math.round(Math.abs(1 - diff) * 100)
        });
      }
    }
  });

  return trends;
};

const getKeyDifference = (countryData, key, years) => {
  return (
    countryData[countryData.length - (years + 1)][key] /
    countryData[countryData.length - 1][key]
  );
};
