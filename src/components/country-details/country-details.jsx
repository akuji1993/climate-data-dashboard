import React from "react";
import style from "./country-details.module.scss";
import { getIcon } from "../../utils/icons";

const CountryDetails = ({ data, label }) => {
  return (
    <div className={style.CountryDetails}>
      <h2>Data for {label}</h2>
      <div className={style.details}>
        {Object.keys(data)
          .filter(d => d !== "sum")
          .map((key, idx) => (
            <div
              key={`country-detail-category-${idx}`}
              className={style.category}>
              <div className={style.icon}>{getIcon(key)}</div>
              <div className={style.description}>{key.replace(/_/g, " ")}</div>
              <div className={style.value}>{Math.round(data[key])} kt/year</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountryDetails;
