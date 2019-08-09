import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import style from "./emissions-by-country-chart.module.scss";
import PropTypes from "proptypes";

const EmissionsByCountryChart = ({ data, label }) => {
  return (
    <div className={style.EmissionsByCountryChart}>
      <h3>Emissions for {label}</h3>
      {data && (
        <ResponsiveContainer width={"99%"} height={600}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={original => `${original} kt/year`} />
            <Legend />
            <Bar dataKey="buildings" stackId="a" fill="#E53A40" />
            <Bar dataKey="non_combustion" stackId="a" fill="#FFBC42" />
            <Bar
              dataKey="other_industrial_combustion"
              stackId="a"
              fill="#EFDC05"
            />
            <Bar dataKey="power_industry" stackId="a" fill="#2EC4B6" />
            <Bar dataKey="transport" stackId="a" fill="#30A9DE" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

EmissionsByCountryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      buildings: PropTypes.number,
      non_combustion: PropTypes.number,
      other_industrial_combustion: PropTypes.number,
      power_industry: PropTypes.number,
      transport: PropTypes.number3,
      year: PropTypes.number
    })
  )
};
export default EmissionsByCountryChart;
