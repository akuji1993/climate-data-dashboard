import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import style from "./global-carbon-budget-chart.module.scss";

const lineConfigs = [
  {
    key: "Fossil-Fuel-And-Industry",
    color: "#090707"
  },
  {
    key: "Land-Use-Change-Emissions",
    color: "#CE6D39"
  },
  {
    key: "Atmospheric-Growth",
    color: "#fdc23e"
  },
  {
    key: "Ocean-Sink",
    color: "#30A9DE"
  },
  {
    key: "Land-Sink",
    color: "#5CAB7D"
  }
];

class GlobalCarbonBudgetChart extends Component {
  constructor() {
    super();

    this.state = {
      shownLines: {
        "Fossil-Fuel-And-Industry": true,
        "Land-Use-Change-Emissions": true,
        "Atmospheric-Growth": true,
        "Ocean-Sink": true,
        "Land-Sink": true
      }
    };
  }

  toggleLine(key) {
    const { shownLines } = this.state;

    this.setState({
      shownLines: Object.assign(shownLines, {
        [key]: !shownLines[key]
      })
    });
  }

  renderLines() {
    const { shownLines } = this.state;
    const lines = [];
    lineConfigs.forEach((lineConfig, idx) => {
      if (shownLines[lineConfig.key]) {
        lines.push(
          <Line
            key={`chart-line-${idx}`}
            type="monotone"
            dataKey={lineConfig.key}
            stroke={lineConfig.color}
            strokeWidth={2}
            dot={false}
            legendType="square"
          />
        );
      }
    });

    return lines;
  }

  render() {
    const { data } = this.props;
    const { shownLines } = this.state;

    return (
      <div className={style.GlobalCarbonBudgetChart}>
        <h3>Filter</h3>
        <div className={style.filter}>
          {lineConfigs.map((lineConfig, idx) => (
            <div
              style={{
                borderColor: shownLines[lineConfig.key]
                  ? lineConfig.color
                  : "#fcfcfc"
              }}
              key={`line-button-${idx}`}
              className={style.item}
              onClick={() => this.toggleLine(lineConfig.key)}>
              {lineConfig.key}
            </div>
          ))}
        </div>
        <h3>Graph</h3>
        {data && (
          <ResponsiveContainer width={"99%"} height={600}>
            <LineChart data={data} margin={{ left: -25 }}>
              <XAxis dataKey="Year" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip formatter={original => `${original} GtC/yr`} />
              <Legend />
              {this.renderLines()}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  }
}

export default GlobalCarbonBudgetChart;
