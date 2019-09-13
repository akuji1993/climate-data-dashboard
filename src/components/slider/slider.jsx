import React from "react";
import style from "./slider.module.scss";

class Slider extends React.Component {
  constructor() {
    super();

    this.inputRef = React.createRef();
  }

  getSliderPos() {
    const { min, max, value } = this.props;
    const width = this.inputRef.current.clientWidth;
    console.log(width);

    const percentage = (value - min) / (max - min);

    return `${width * percentage - 48 * percentage}px`;
  }

  render() {
    const { onChange, id, value, min, max } = this.props;
    return (
      <div className={style.Slider}>
        <input
          id={id}
          ref={this.inputRef}
          onChange={e => {
            console.log(this.inputRef);
            onChange(e.target.value);
          }}
          className={style.Slider}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value ? value : ""}
        />
        {this.inputRef &&
          this.inputRef.current &&
          this.inputRef.current.valueAsNumber && (
            <div className={style.label} style={{ left: this.getSliderPos() }}>
              {this.inputRef.current.valueAsNumber}
            </div>
          )}
      </div>
    );
  }
}
export default Slider;
