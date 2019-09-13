import React from "react";
import style from "./insights.module.scss";
import classNames from "classnames";
import { findTrends } from "../../utils/trends";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { getIcon } from "../../utils/icons";

const Insights = ({ data, years }) => {
  const trends = findTrends(data, years);

  return (
    <div className={style.Insights}>
      <h3>Comparison to {data[data.length - years].year}</h3>
      <div className={style.trends}>
        {trends.map((trend, idx) => (
          <div key={`trend-${idx}`} className={style.trend}>
            <div className={style.categoryIcon}>{getIcon(trend.category)}</div>
            <div
              className={classNames(
                style.trendIcon,
                { [style.trendIcon__increase]: trend.type === "increase" },
                { [style.trendIcon__decrease]: trend.type === "decrease" }
              )}>
              {trend.type === "increase" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div
              className={classNames(
                style.percentage,
                {
                  [style.percentage__increase]: trend.type === "increase"
                },
                {
                  [style.percentage__decrease]: trend.type === "decrease"
                }
              )}>
              {trend.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
