import React from "react";
import { Range, getTrackBackground } from "react-range";
import style from "./slider.module.scss";

class Slider extends React.Component {
  constructor() {
    super();

    this.inputRef = React.createRef();
  }

  render() {
    const { onChange, value, min, max } = this.props;
    return (
      <div
        className={style.Slider}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em"
        }}>
        <Range
          step={1}
          min={min}
          max={max}
          values={[value]}
          onChange={values => onChange(values[0])}
          renderTrack={({ props, children }) => (
            <div
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}>
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [value],
                    colors: ["#75d701", "#ccc"],
                    min: min,
                    max: max
                  }),
                  alignSelf: "center"
                }}>
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "42px",
                width: "42px",
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}>
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#75d701" : "#CCC"
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: "30px" }} id="output">
          {value}
        </output>
      </div>
    );
  }
}
export default Slider;
