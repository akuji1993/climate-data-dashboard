import React from "react";
import style from "./emissions-world-map.module.scss";
import data from "../../assets/data/emissions-per-country.json";
import WorldMap from "../../components/world-map/world-map";
import Slider from "../../components/slider/slider";
import CountryDetails from "../../components/country-details/country-details";

class EmissionsWorldMap extends React.Component {
  constructor() {
    super();

    this.state = {
      reducedData: [],
      countries: [],
      selectedCountry: null,
      sliderValue: 1990
    };
  }

  componentDidMount() {
    /**
     * This transforms the original json's data to a map-friendly format
     * The new format has ONE key entry per year, which in turn has an
     * array of data, one entry for each country, with all the data for that
     * neatly added into one object, including a sum
     */
    const countries = {};
    const reducedData = data.reduce((result, item) => {
      if (!result[item.Year]) {
        result[item.Year] = {};
      }

      const itemCode = item.Code.substr(0, 3);
      if (itemCode === "WOR") {
        return result;
      } else if (!countries[itemCode]) {
        countries[itemCode] = {
          code: itemCode,
          label: item.Name
        };
      }
      if (!result[item.Year][itemCode]) {
        result[item.Year][itemCode] = {};
      }

      const sectorString = item.Sector.toLowerCase()
        .trim()
        // eslint-disable-next-line no-useless-escape
        .replace(/\s/g, "_")
        .replace(/-/g, "_");

      if (!result[item.Year][itemCode][sectorString]) {
        result[item.Year][itemCode][sectorString] = item.Emissions;
      }

      if (!result[item.Year][itemCode].sum) {
        result[item.Year][itemCode].sum = item.Emissions;
      } else {
        result[item.Year][itemCode].sum += item.Emissions;
      }

      return result;
    }, {});

    this.setState({
      reducedData,
      countries
    });
  }

  componentWillUnmount() {
    this.setState({
      reducedData: [],
      countries: [],
      selectedCountry: null,
      sliderValue: null
    });
  }

  setSliderValue(value) {
    this.setState({
      sliderValue: value
    });
  }

  render() {
    const { reducedData, sliderValue, selectedCountry, countries } = this.state;
    return (
      <div className={style.EmissionsWorldMap}>
        <WorldMap
          data={reducedData[sliderValue]}
          onChangeCountry={countryId => this.setState({ selectedCountry: countryId })}
        />
        <Slider
          id="world-map-slider"
          min={1970}
          max={2016}
          value={sliderValue}
          onChange={value => this.setSliderValue(value)}
        />
        {selectedCountry && (
          <div className={style.countryInfo}>
            <CountryDetails data={reducedData[sliderValue][selectedCountry]} label={countries[selectedCountry].label} />
          </div>
        )}
      </div>
    );
  }
}

export default EmissionsWorldMap;
