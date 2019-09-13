import React from "react";
import style from "./slider.module.scss";

const Slider = ({ onChange, id, value, min, max }) => (
  <div className={style.Slider}>
    <input
      id={id}
      onChange={e => onChange(e.target.value)}
      className={style.Slider}
      type="range"
      min={min}
      max={max}
      step={1}
      value={value ? value : ""}
    />
  </div>
);
export default Slider;
