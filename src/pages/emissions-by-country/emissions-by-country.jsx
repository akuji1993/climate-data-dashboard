import React, { Component } from "react";
import data from "../../assets/data/emissions-per-country.json";
import EmissionsByCountryChart from "../../components/emissions-by-country-chart/emissions-by-country-chart";
import AutoComplete from "../../components/autocomplete/autocomplete";
import Insights from "../../components/insights/insights";
import style from "./emissions-by-country.module.scss";

class EmissionsByCountryPage extends Component {
  constructor() {
    super();
    this.state = {
      countryData: null,
      countries: null,
      reducedData: null
    };
  }

  componentDidMount() {
    /**
     * This transforms the original json's data to a chart-friendly format
     * The new format has ONE key entry per country, which in turn has an
     * array of data, one entry for each year, with all the data for that
     * neatly added into one object
     */
    const reducedData = data.reduce((result, item) => {
      if (!result[item.Code]) {
        result[item.Code] = {
          label: item.Name,
          data: []
        };
      }

      const countryData = result[item.Code];
      let yearData = countryData.data.find(
        savedItem => savedItem.year === item.Year
      );

      const sectorString = item.Sector.toLowerCase()
        .trim()
        // eslint-disable-next-line no-useless-escape
        .replace(/\s/g, "_")
        .replace(/-/g, "_");

      if (countryData && yearData) {
        yearData = Object.assign({}, yearData, {
          [sectorString]: item.Emissions
        });
        const affectedCountry = result[item.Code];
        let newCountryData = affectedCountry.data.filter(
          entry => entry.year !== item.Year
        );
        newCountryData.push(yearData);
        result[item.Code].data = newCountryData;
      } else {
        result[item.Code].data.push({
          year: item.Year,
          [sectorString]: item.Emissions
        });
      }

      return result;
    }, {});

    /**
     * Get list of all countries in the list to show as options
     */
    const countries = Object.keys(reducedData).reduce((result, key) => {
      result.push({
        code: key,
        label: reducedData[key].label
      });
      return result;
    }, []);

    this.setState({
      reducedData,
      countries,
      countryData: reducedData["DEU"]
    });
  }

  setCountryData(countryCode) {
    const { reducedData } = this.state;

    this.setState({
      countryData: reducedData[countryCode]
    });
  }

  render() {
    const { countryData, countries } = this.state;

    return (
      <div className={style.EmissionsByCountryPage}>
        <h3>Search for a Country </h3>
        <AutoComplete
          options={countries}
          onChange={countryCode => this.setCountryData(countryCode)}
        />
        {countryData && (
          <>
            <EmissionsByCountryChart
              data={countryData.data}
              label={countryData.label}
            />
            <Insights data={countryData.data} years={10} />
            <Insights data={countryData.data} years={20} />
            <Insights data={countryData.data} years={40} />
          </>
        )}
        <h3>Sources</h3>
        <span className={style.paragraph}>
          Original data can be found here:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/openclimatedata/edgar-co2-emissions">
            Open Climate Data Github
          </a>
        </span>
        <span className={style.paragraph}>
          You can learn more about this here:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://edgar.jrc.ec.europa.eu/overview.php?v=booklet2017&dst=CO2emi">
            EDGAR’s Global Fossil CO2 Emissions from 1990 to 2016
          </a>
        </span>
      </div>
    );
  }
}

export default EmissionsByCountryPage;
