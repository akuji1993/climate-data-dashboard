import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { generateColor } from "../../utils/colorgradient";

import world50Data from "../../assets/data/world-50m.json";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

class WorldMap extends React.Component {
  constructor() {
    super();

    this.calculateStats = this.calculateStats.bind(this);
    this.getFillColor = this.getFillColor.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.selectCountry = this.selectCountry.bind(this);

    const colorRange = generateColor("#FFED00", "#BF033B", 1000);

    this.state = {
      colorRange,
      minSum: 0,
      maxSum: 0
    };
  }

  componentDidMount() {
    this.calculateStats();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.calculateStats();
    }
  }

  calculateStats() {
    const { data } = this.props;
    const maxSum = data
      ? Object.keys(data).reduce((result, key) => {
          if (data[key].sum > result) {
            result = data[key].sum;
          }
          return result;
        }, 0)
      : 0;

    const minSum = data
      ? Object.keys(data).reduce((result, key) => {
          if (data[key].sum < result) {
            result = data[key].sum;
          }
          return result;
        }, maxSum)
      : 0;

    this.setState({
      maxSum,
      minSum
    });
  }

  getFillColor(value) {
    const { minSum, maxSum, colorRange } = this.state;
    const percentage = ((value - minSum) / (maxSum - minSum)) * 100;

    const position = percentage === 100 ? 999 : Math.floor(percentage * 10);

    return colorRange[position];
  }

  selectCountry(geoInfo) {
    this.setState({ selectedCountry: geoInfo.id }, () => {
      this.props.onChangeCountry(this.state.selectedCountry);
    });
  }

  isSelected(countryId) {
    return this.state.selectedCountry === countryId;
  }

  render() {
    const { data } = this.props;
    const { maxSum, minSum } = this.state;

    return (
      <div style={wrapperStyles}>
        {data && maxSum && minSum && (
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-11, 0, 0]
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto"
            }}>
            <ZoomableGroup center={[0, 20]} disablePanning>
              <Geographies disableOptimization={true} geography={world50Data}>
                {(geographies, projection) => {
                  return geographies.map((geography, i) => {
                    const countryData = data[geography.id];
                    return (
                      geography.id !== "ATA" && (
                        <Geography
                          key={i}
                          geography={geography}
                          projection={projection}
                          onClick={geoInfo => this.selectCountry(geoInfo)}
                          style={{
                            default: {
                              fill: this.isSelected(geography.id)
                                ? "#75d701"
                                : countryData
                                ? this.getFillColor(countryData.sum)
                                : "#ECEFF1",
                              stroke: "#222",
                              strokeWidth: 0.5,
                              outline: "none"
                            },
                            hover: {
                              fill: "#75d701",
                              stroke: "#222",
                              strokeWidth: 1.5,
                              outline: "none"
                            },
                            pressed: {
                              fill: "#56a902",
                              stroke: "#222",
                              strokeWidth: 1.5,
                              outline: "none"
                            }
                          }}
                        />
                      )
                    );
                  });
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>
    );
  }
}

export default WorldMap;
